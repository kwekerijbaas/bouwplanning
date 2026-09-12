// Werkbonnen Kwekerij Baas — edge function (alleen API)
// Proces: teamleider vult dagbon in -> administratie beoordeelt -> weekoverzicht -> factuur (UBL / CSV voor Exact Online).
// De pagina zelf is public/werkbonnen.html in de bouwplanning-repo (Webflow Cloud, /app/werkbonnen.html).
import { createClient } from "npm:@supabase/supabase-js@2";
import Anthropic from "npm:@anthropic-ai/sdk";

const db = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Twee toegangscodes: werkvloer (teamleiders) en administratie. Aanpasbaar via secrets WB_CODE_TEAM / WB_CODE_ADMIN.
const CODE_TEAM = Deno.env.get("WB_CODE_TEAM") ?? "bon2026";
const CODE_ADMIN = Deno.env.get("WB_CODE_ADMIN") ?? "admin2026";
const BUCKET = "werkbonnen";

const CATEGORIEEN = ["arbeid", "km", "overnachting", "materieel", "transport", "materiaal"];
const BEDRIJF_VELDEN = ["soort", "naam", "adres", "postcode_plaats", "land", "kvk", "btw_nummer", "iban", "email", "telefoon", "debiteur_code", "actief", "kleur", "kleur2", "website"];
const PROJECT_VELDEN = ["code", "naam", "adres", "postcode_plaats", "aannemer_id", "opdrachtgever_id", "claimnummer", "factuur_omschrijving", "actief", "sort"];
const TARIEF_VELDEN = ["categorie", "omschrijving", "eenheid_n", "eenheid_per", "eenheid_totaal", "prijs", "dagtype", "sort", "actief"];
const FACTUUR_VELDEN = ["nummer", "datum", "vervaldatum", "omschrijving", "regel_omschrijving", "btw_pct", "status"];

const ISO_DATUM = /^\d{4}-\d{2}-\d{2}$/;

function pak(bron: Record<string, unknown>, velden: string[]) {
  const uit: Record<string, unknown> = {};
  for (const v of velden) if (v in bron) uit[v] = bron[v];
  return uit;
}
function r2(n: number) { return Math.round((n + Number.EPSILON) * 100) / 100; }
function num(v: unknown, veld: string, min = 0): number {
  const n = Number(String(v ?? "").replace(",", "."));
  if (!Number.isFinite(n) || n < min) throw new Error(veld + " is geen geldig getal");
  return n;
}
function checkDatum(v: unknown, veld: string) {
  if (typeof v !== "string" || !ISO_DATUM.test(v)) throw new Error(veld + " is geen geldige datum");
}
// ISO-weeknummer (maandag = eerste dag), zoals op de KZ-overzichten.
function isoWeek(d: string): { jaar: number; week: number } {
  const [y, m, dd] = d.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, dd));
  const dag = dt.getUTCDay() || 7;
  dt.setUTCDate(dt.getUTCDate() + 4 - dag);
  const jaarStart = new Date(Date.UTC(dt.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((dt.getTime() - jaarStart.getTime()) / 86400000) + 1) / 7);
  return { jaar: dt.getUTCFullYear(), week };
}

// Regels normaliseren en narekenen (server is leidend voor de bedragen).
function normRegels(regels: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(regels)) throw new Error("regels ontbreken");
  if (regels.length > 200) throw new Error("te veel regels op één bon");
  return regels.map((r, i) => {
    const x = (r ?? {}) as Record<string, unknown>;
    const categorie = String(x.categorie ?? "");
    if (!CATEGORIEEN.includes(categorie)) throw new Error("onbekende categorie op regel " + (i + 1));
    const omschrijving = String(x.omschrijving ?? "").trim();
    if (!omschrijving) throw new Error("omschrijving leeg op regel " + (i + 1));
    const aantal = num(x.aantal, "aantal op regel " + (i + 1));
    const per = x.per == null || x.per === "" ? null : num(x.per, "per-waarde op regel " + (i + 1));
    const prijs = num(x.prijs, "prijs op regel " + (i + 1));
    // Hele getallen: mannen, auto's, nachten, dagen, stuks; alleen uren mogen halve zijn.
    if (categorie !== "transport" && !Number.isInteger(aantal)) throw new Error("aantal op regel " + (i + 1) + " moet een heel getal zijn (geen halve mannen, auto's, nachten of stuks)");
    if (per != null && String(x.eenheid_per ?? "") !== "uur" && !Number.isInteger(per)) throw new Error("km/dagen op regel " + (i + 1) + " moeten een heel getal zijn");
    const totaal = r2(per == null ? aantal : aantal * per);
    return {
      sort: i + 1, categorie, omschrijving,
      tarief_id: x.tarief_id == null || x.tarief_id === "" ? null : Number(x.tarief_id),
      aantal, per, totaal, prijs, bedrag: r2(totaal * prijs),
      eenheid_n: String(x.eenheid_n ?? ""), eenheid_per: String(x.eenheid_per ?? ""), eenheid_totaal: String(x.eenheid_totaal ?? ""),
      namen: String(x.namen ?? "").slice(0, 2000),
    };
  });
}


// ---------- foto van papieren bon uitlezen (Claude vision, structured output) ----------
const SCAN_SCHEMA = {
  type: "object", additionalProperties: false,
  required: ["datum", "afgetekend_door", "opmerking", "leesbaarheid", "regels"],
  properties: {
    datum: { type: ["string", "null"], description: "Datum van de bon als YYYY-MM-DD, of null als onleesbaar" },
    afgetekend_door: { type: ["string", "null"], description: "Naam van degene die namens de opdrachtgever heeft afgetekend, of null" },
    opmerking: { type: "string", description: "Overige tekst op de bon die niet in een regel past (werkomschrijving, bijzonderheden); leeg als niets" },
    leesbaarheid: { type: "string", enum: ["goed", "matig", "slecht"] },
    regels: {
      type: "array",
      items: {
        type: "object", additionalProperties: false,
        required: ["categorie", "omschrijving", "aantal", "per", "namen", "zekerheid"],
        properties: {
          categorie: { type: "string", enum: ["arbeid", "km", "overnachting", "materieel", "transport", "materiaal"] },
          omschrijving: { type: "string", description: "Exact de omschrijving uit de tarievenlijst als die past, anders de tekst van de bon" },
          aantal: { type: "number", description: "arbeid: aantal man; km: aantal auto's; overnachting: aantal nachten; materieel/materiaal: aantal dagen of stuks; transport: uren" },
          per: { type: ["number", "null"], description: "arbeid: uren per man; km: km per auto; materieel met stuks: dagen; anders null" },
          namen: { type: "string", description: "Namen van de medewerkers bij een arbeidregel, gescheiden door komma's; leeg als niet vermeld" },
          zekerheid: { type: "string", enum: ["hoog", "middel", "laag"] },
        },
      },
    },
  },
};
async function leesBonFoto(b64: string, tarieven: Array<Record<string, unknown>>, project: Record<string, unknown> | null, datumHint: string) {
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) throw new Error("Foto uitlezen staat nog niet aan: zet de secret ANTHROPIC_API_KEY op de edge function \"werkbonnen\"");
  const komma = b64.indexOf(",");
  const mediaType = (b64.match(/^data:(image\/[a-z]+);/) ?? [])[1] ?? "image/jpeg";
  const data = komma >= 0 ? b64.slice(komma + 1) : b64;
  if (!data) throw new Error("lege foto");
  const lijst = tarieven.filter((t) => t.actief).map((t) => `- ${t.categorie} | ${t.omschrijving} | ${t.eenheid_n || "-"} x ${t.eenheid_per || "-"} | ${t.eenheid_totaal} | ${Number(t.prijs).toFixed(2)}${t.dagtype && t.dagtype !== "alle" ? " | dagtype " + t.dagtype : ""}`).join("\n");
  const client = new Anthropic({ apiKey: key });
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 8000,
    output_config: { effort: "medium", format: { type: "json_schema", schema: SCAN_SCHEMA } },
    system: "Je leest handgeschreven en getypte werkbonnen (aftekenbonnen) van een kassenbouwer/kasherstelbedrijf uit. Je geeft alleen terug wat er op de bon staat; niets bijverzinnen. Bij twijfel: zekerheid laag. Getallen met komma zijn decimalen. Arbeid: 'n man x uren' (mannen zijn hele getallen). Kilometers: 'n auto's x km'. Overnachting: aantal nachten. Materieel (hoogwerker, platformtrekker, shovel, gootkarren, zuiginstallatie): aantal dagen, bij stuks ook dagen in 'per'. Materiaal: stuks. Gebruik de omschrijving uit de tarievenlijst wanneer die overeenkomt.",
    messages: [{
      role: "user",
      content: [
        { type: "image", source: { type: "base64", media_type: mediaType as "image/jpeg" | "image/png" | "image/webp" | "image/gif", data } },
        { type: "text", text: "Lees deze werkbon uit voor project " + (project ? `${project.naam} (${project.code}, ${project.adres})` : "onbekend") + ". Verwachte datum rond " + datumHint + ".\n\nTarievenlijst (categorie | omschrijving | aantal-eenheid x per-eenheid | totaal-eenheid | prijs):\n" + lijst },
      ],
    }],
  });
  if (response.stop_reason === "refusal") throw new Error("Foto kon niet worden uitgelezen (" + (response.stop_details?.explanation ?? "geweigerd") + ")");
  const tekst = response.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");
  let uit: Record<string, unknown>;
  try { uit = JSON.parse(tekst); } catch { throw new Error("Foto uitgelezen maar antwoord niet leesbaar; probeer een scherpere foto"); }
  return uit;
}

async function uploadB64(b64: string, contentType: string, ext: string): Promise<string> {
  const komma = b64.indexOf(",");
  const data = Uint8Array.from(atob(komma >= 0 ? b64.slice(komma + 1) : b64), (c) => c.charCodeAt(0));
  if (!data.length) throw new Error("leeg bestand");
  if (data.length > 8 * 1024 * 1024) throw new Error("bestand groter dan 8 MB");
  await db.storage.createBucket(BUCKET, { public: true }).then(() => {}, () => {});
  const pad = new Date().toISOString().slice(0, 10) + "/" + crypto.randomUUID() + "." + ext;
  const { error } = await db.storage.from(BUCKET).upload(pad, data.buffer, { contentType });
  if (error) throw error;
  return pad;
}

async function log(wie: string, actie: string) {
  if (actie) await db.from("wb_logboek").insert({ wie, actie });
}

async function bonMetRegels(id: number) {
  const { data: bon, error } = await db.from("wb_bon").select("*").eq("id", id).single();
  if (error) throw error;
  return bon;
}

async function volgendFactuurnummer(): Promise<string> {
  const { data } = await db.from("wb_instelling").select("*").in("sleutel", ["factuur_prefix", "factuur_volgnummer"]);
  const m = new Map((data ?? []).map((r) => [r.sleutel, r.waarde]));
  const prefix = String(m.get("factuur_prefix") ?? new Date().getFullYear());
  const nr = Number(m.get("factuur_volgnummer") ?? 1);
  return prefix + String(nr).padStart(3, "0");
}
async function verhoogVolgnummer(gebruikt: string) {
  const { data } = await db.from("wb_instelling").select("*").in("sleutel", ["factuur_prefix", "factuur_volgnummer"]);
  const m = new Map((data ?? []).map((r) => [r.sleutel, r.waarde]));
  const prefix = String(m.get("factuur_prefix") ?? "");
  if (gebruikt.startsWith(prefix)) {
    const n = Number(gebruikt.slice(prefix.length));
    if (Number.isInteger(n) && n >= Number(m.get("factuur_volgnummer") ?? 0)) {
      await db.from("wb_instelling").upsert({ sleutel: "factuur_volgnummer", waarde: String(n + 1) });
    }
  }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type, x-code",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function json(x: unknown, status = 200) {
  return new Response(JSON.stringify(x), { status, headers: { "Content-Type": "application/json", ...CORS } });
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (!url.pathname.endsWith("/api")) {
    return new Response("Werkbonnen API - de app zelf staat op /app/werkbonnen.html.", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  if (req.method !== "POST") return new Response("POST verwacht", { status: 405 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ fout: "geen json" }, 400); }

  const code = String(req.headers.get("x-code") ?? body.code ?? "");
  const rol = code === CODE_ADMIN ? "admin" : code === CODE_TEAM ? "team" : "";
  if (!rol) return json({ fout: "onjuiste code" }, 401);
  const admin = rol === "admin";

  const wie = String(body.wie ?? "").slice(0, 80);
  const actie = String(body.action ?? "");
  const fields = (body.fields ?? {}) as Record<string, unknown>;
  const id = body.id == null ? undefined : Number(body.id);

  try {
    switch (actie) {
      case "state": {
        const [bedrijven, projecten, tarieven, bonnen, regels, facturen, instellingen, logboek] = await Promise.all([
          db.from("wb_bedrijf").select("*").order("soort").order("naam"),
          db.from("wb_project").select("*").order("sort").order("code"),
          db.from("wb_tarief").select("*").order("sort").order("omschrijving"),
          db.from("wb_bon").select("*").order("datum", { ascending: false }).order("id", { ascending: false }).limit(2000),
          db.from("wb_bonregel").select("*").order("bon_id").order("sort").limit(20000),
          db.from("wb_factuur").select("*").order("id", { ascending: false }).limit(500),
          db.from("wb_instelling").select("*"),
          admin ? db.from("wb_logboek").select("*").order("id", { ascending: false }).limit(60) : Promise.resolve({ data: [], error: null }),
        ]);
        for (const r of [bedrijven, projecten, tarieven, bonnen, regels, facturen, instellingen, logboek]) if (r.error) throw r.error;
        const inst: Record<string, string> = {};
        for (const r of instellingen.data ?? []) inst[r.sleutel] = r.waarde;
        return json({
          rol, bedrijven: bedrijven.data, projecten: projecten.data, tarieven: tarieven.data,
          bonnen: bonnen.data, regels: regels.data, facturen: facturen.data, instellingen: inst, logboek: logboek.data,
          storage_url: Deno.env.get("SUPABASE_URL") + "/storage/v1/object/public/" + BUCKET + "/",
        });
      }

      // ---------- werkvloer: dagbonnen ----------
      case "bon_save": {
        const project_id = Number(fields.project_id);
        if (!Number.isInteger(project_id)) throw new Error("kies een project");
        checkDatum(fields.datum, "datum");
        const regels = normRegels(body.regels);
        const basis: Record<string, unknown> = {
          project_id, datum: fields.datum,
          ingevuld_door: String(fields.ingevuld_door ?? wie).slice(0, 80),
          opmerking: String(fields.opmerking ?? "").slice(0, 4000),
          afgetekend_door: String(fields.afgetekend_door ?? "").slice(0, 80),
          updated_at: new Date().toISOString(),
        };
        if (typeof fields.handtekening_b64 === "string" && fields.handtekening_b64) {
          basis.handtekening_pad = await uploadB64(fields.handtekening_b64, "image/png", "png");
        }
        let nieuweFotos: string[] = [];
        if (Array.isArray(fields.fotos_b64) && fields.fotos_b64.length) {
          if (fields.fotos_b64.length > 10) throw new Error("maximaal 10 foto's per bon");
          for (const f of fields.fotos_b64) nieuweFotos.push(await uploadB64(String(f), "image/jpeg", "jpg"));
        }
        let bonId = id;
        if (bonId) {
          const oud = await bonMetRegels(bonId);
          if (!admin && !["concept", "afgekeurd"].includes(oud.status)) throw new Error("Deze bon is al ingediend en kan alleen door de administratie gewijzigd worden");
          if (admin && oud.status === "gefactureerd") throw new Error("Deze bon zit al op een factuur");
          const upd: Record<string, unknown> = { ...basis };
          const bestaand = Array.isArray(fields.foto_paden) ? (fields.foto_paden as string[]) : (oud.foto_paden ?? []);
          upd.foto_paden = [...bestaand, ...nieuweFotos];
          if (oud.status === "afgekeurd") upd.status = "concept";
          const { error } = await db.from("wb_bon").update(upd).eq("id", bonId);
          if (error) throw error;
          const { error: e2 } = await db.from("wb_bonregel").delete().eq("bon_id", bonId);
          if (e2) throw e2;
        } else {
          const { data, error } = await db.from("wb_bon").insert({ ...basis, status: "concept", foto_paden: nieuweFotos }).select("id").single();
          if (error) throw error;
          bonId = data.id;
        }
        if (regels.length) {
          const { error } = await db.from("wb_bonregel").insert(regels.map((r) => ({ ...r, bon_id: bonId })));
          if (error) throw error;
        }
        if (body.indienen) {
          if (!regels.length) throw new Error("bon heeft nog geen regels");
          const { error } = await db.from("wb_bon").update({ status: "ingediend", ingediend_ts: new Date().toISOString(), beoordeling: "", beoordeeld_door: "", beoordeeld_ts: null }).eq("id", bonId);
          if (error) throw error;
        }
        await log(wie, String(body.log ?? ""));
        return json({ ok: true, id: bonId });
      }
      case "bon_indienen": {
        const bon = await bonMetRegels(id!);
        if (!["concept", "afgekeurd"].includes(bon.status)) throw new Error("bon is al ingediend");
        const { count } = await db.from("wb_bonregel").select("*", { count: "exact", head: true }).eq("bon_id", id);
        if (!count) throw new Error("bon heeft nog geen regels");
        const { error } = await db.from("wb_bon").update({ status: "ingediend", ingediend_ts: new Date().toISOString(), beoordeling: "", beoordeeld_door: "", beoordeeld_ts: null }).eq("id", id);
        if (error) throw error;
        break;
      }
      case "bon_delete": {
        const bon = await bonMetRegels(id!);
        if (!admin && !["concept", "afgekeurd"].includes(bon.status)) throw new Error("alleen concepten kunnen verwijderd worden");
        if (bon.status === "gefactureerd") throw new Error("bon zit op een factuur");
        const { error } = await db.from("wb_bon").delete().eq("id", id);
        if (error) throw error;
        break;
      }

      // ---------- administratie: beoordelen ----------
      case "bon_beoordeel": {
        if (!admin) throw new Error("alleen administratie");
        const besluit = String(body.besluit ?? "");
        if (!["goedgekeurd", "afgekeurd", "ingediend"].includes(besluit)) throw new Error("onbekend besluit");
        const bon = await bonMetRegels(id!);
        if (bon.status === "gefactureerd") throw new Error("bon zit al op een factuur");
        const { error } = await db.from("wb_bon").update({
          status: besluit, beoordeeld_door: besluit === "ingediend" ? "" : wie,
          beoordeeld_ts: besluit === "ingediend" ? null : new Date().toISOString(),
          beoordeling: String(body.beoordeling ?? "").slice(0, 2000),
        }).eq("id", id);
        if (error) throw error;
        break;
      }

      // ---------- stamgegevens ----------
      case "bedrijf_save": {
        if (!admin) throw new Error("alleen administratie");
        const upd = pak(fields, BEDRIJF_VELDEN);
        if ("naam" in upd && !String(upd.naam).trim()) throw new Error("naam leeg");
        if ("soort" in upd && !["aannemer", "opdrachtgever"].includes(String(upd.soort))) throw new Error("onbekend soort");
        const { error } = id ? await db.from("wb_bedrijf").update(upd).eq("id", id) : await db.from("wb_bedrijf").insert(upd);
        if (error) throw error;
        break;
      }
      case "project_save": {
        if (!admin) throw new Error("alleen administratie");
        const upd = pak(fields, PROJECT_VELDEN);
        if ("code" in upd && !String(upd.code).trim()) throw new Error("projectcode leeg");
        const { error } = id ? await db.from("wb_project").update(upd).eq("id", id) : await db.from("wb_project").insert(upd);
        if (error) { if (String(error.message).includes("duplicate")) throw new Error("projectcode bestaat al"); throw error; }
        break;
      }
      case "tarief_save": {
        if (!admin) throw new Error("alleen administratie");
        const upd = pak(fields, TARIEF_VELDEN);
        if ("categorie" in upd && !CATEGORIEEN.includes(String(upd.categorie))) throw new Error("onbekende categorie");
        if ("prijs" in upd) upd.prijs = num(upd.prijs, "prijs");
        if ("dagtype" in upd && !["alle", "ma-vr", "za", "zo"].includes(String(upd.dagtype))) throw new Error("onbekend dagtype");
        const { error } = id ? await db.from("wb_tarief").update(upd).eq("id", id) : await db.from("wb_tarief").insert(upd);
        if (error) { if (String(error.message).includes("duplicate")) throw new Error("dit tarief bestaat al"); throw error; }
        break;
      }
      case "tarief_delete": {
        if (!admin) throw new Error("alleen administratie");
        const { error } = await db.from("wb_tarief").update({ actief: false }).eq("id", id);
        if (error) throw error;
        break;
      }
      case "instelling_save": {
        if (!admin) throw new Error("alleen administratie");
        const inst = (body.instellingen ?? {}) as Record<string, unknown>;
        const rijen = Object.entries(inst).map(([sleutel, waarde]) => ({ sleutel: String(sleutel).slice(0, 60), waarde: String(waarde ?? "").slice(0, 500) }));
        if (rijen.length) { const { error } = await db.from("wb_instelling").upsert(rijen); if (error) throw error; }
        break;
      }

      // ---------- facturatie ----------
      case "factuur_maak": {
        if (!admin) throw new Error("alleen administratie");
        const project_id = Number(body.project_id);
        const jaar = Number(body.jaar), week = Number(body.week);
        if (!Number.isInteger(project_id) || !Number.isInteger(jaar) || !Number.isInteger(week)) throw new Error("project, jaar en week zijn verplicht");
        const bonIds = (body.bon_ids ?? []) as number[];
        if (!Array.isArray(bonIds) || !bonIds.length) throw new Error("geen goedgekeurde bonnen geselecteerd");
        const { data: bonnen, error: e1 } = await db.from("wb_bon").select("*").in("id", bonIds);
        if (e1) throw e1;
        for (const b of bonnen ?? []) {
          if (b.project_id !== project_id) throw new Error("bon " + b.id + " hoort bij een ander project");
          if (b.status !== "goedgekeurd") throw new Error("bon van " + b.datum + " is nog niet goedgekeurd");
          const w = isoWeek(b.datum);
          if (w.jaar !== jaar || w.week !== week) throw new Error("bon van " + b.datum + " valt niet in week " + week);
        }
        if ((bonnen ?? []).length !== bonIds.length) throw new Error("niet alle bonnen gevonden");
        const { data: regels, error: e2 } = await db.from("wb_bonregel").select("bedrag").in("bon_id", bonIds);
        if (e2) throw e2;
        const excl = r2((regels ?? []).reduce((s, r) => s + Number(r.bedrag), 0));
        const { data: inst } = await db.from("wb_instelling").select("*");
        const im = new Map((inst ?? []).map((r) => [r.sleutel, r.waarde]));
        const btwPct = Number(im.get("btw_pct") ?? 21);
        const termijn = Number(im.get("betaaltermijn_dagen") ?? 14);
        const btw = r2(excl * btwPct / 100);
        const { data: project, error: e3 } = await db.from("wb_project").select("*").eq("id", project_id).single();
        if (e3) throw e3;
        const nummer = String(body.nummer ?? "").trim() || await volgendFactuurnummer();
        const datum = typeof body.datum === "string" && ISO_DATUM.test(body.datum) ? body.datum : new Date().toISOString().slice(0, 10);
        const verval = new Date(datum + "T00:00:00Z"); verval.setUTCDate(verval.getUTCDate() + termijn);
        const { data: f, error: e4 } = await db.from("wb_factuur").insert({
          nummer, project_id, jaar, week, datum, vervaldatum: verval.toISOString().slice(0, 10),
          omschrijving: project.factuur_omschrijving || ("Uitgevoerde werkzaamheden " + project.naam),
          bedrag_excl: excl, btw_pct: btwPct, btw_bedrag: btw, bedrag_incl: r2(excl + btw),
          status: "concept", aangemaakt_door: wie,
        }).select("id").single();
        if (e4) { if (String(e4.message).includes("duplicate")) throw new Error("factuurnummer " + nummer + " bestaat al"); throw e4; }
        const { error: e5 } = await db.from("wb_bon").update({ status: "gefactureerd", factuur_id: f.id }).in("id", bonIds);
        if (e5) throw e5;
        await verhoogVolgnummer(nummer);
        await log(wie, String(body.log ?? ""));
        return json({ ok: true, id: f.id, nummer });
      }
      case "factuur_update": {
        if (!admin) throw new Error("alleen administratie");
        const upd = pak(fields, FACTUUR_VELDEN);
        if ("datum" in upd) checkDatum(upd.datum, "factuurdatum");
        if ("vervaldatum" in upd) checkDatum(upd.vervaldatum, "vervaldatum");
        if ("status" in upd && !["concept", "definitief", "geexporteerd"].includes(String(upd.status))) throw new Error("onbekende status");
        if ("btw_pct" in upd) {
          const { data: f } = await db.from("wb_factuur").select("bedrag_excl").eq("id", id).single();
          const pct = num(upd.btw_pct, "btw");
          const btw = r2(Number(f?.bedrag_excl ?? 0) * pct / 100);
          upd.btw_pct = pct; upd.btw_bedrag = btw; upd.bedrag_incl = r2(Number(f?.bedrag_excl ?? 0) + btw);
        }
        upd.updated_at = new Date().toISOString();
        const { error } = await db.from("wb_factuur").update(upd).eq("id", id);
        if (error) { if (String(error.message).includes("duplicate")) throw new Error("factuurnummer bestaat al"); throw error; }
        break;
      }
      case "factuur_delete": {
        if (!admin) throw new Error("alleen administratie");
        const { data: f, error: e0 } = await db.from("wb_factuur").select("status").eq("id", id).single();
        if (e0) throw e0;
        if (f.status !== "concept") throw new Error("alleen conceptfacturen kunnen vervallen; zet hem eerst terug naar concept");
        const { error: e1 } = await db.from("wb_bon").update({ status: "goedgekeurd", factuur_id: null }).eq("factuur_id", id);
        if (e1) throw e1;
        const { error: e2 } = await db.from("wb_factuur").delete().eq("id", id);
        if (e2) throw e2;
        break;
      }
      case "bon_lees_foto": {
        const b64 = String(fields.foto_b64 ?? "");
        if (!b64) throw new Error("geen foto meegestuurd");
        const [{ data: tarieven, error: e1 }, { data: project }] = await Promise.all([
          db.from("wb_tarief").select("*").eq("actief", true).order("sort"),
          db.from("wb_project").select("*").eq("id", Number(fields.project_id)).maybeSingle(),
        ]);
        if (e1) throw e1;
        const datumHint = typeof fields.datum === "string" && ISO_DATUM.test(fields.datum) ? fields.datum : new Date().toISOString().slice(0, 10);
        const uit = await leesBonFoto(b64, tarieven ?? [], project ?? null, datumHint);
        // Regels koppelen aan tarieven (omschrijving), prijs en eenheden invullen; arbeid op dagtarief van de datum.
        const datum = typeof uit.datum === "string" && ISO_DATUM.test(uit.datum) ? uit.datum : datumHint;
        const dag = new Date(datum + "T00:00:00Z").getUTCDay();
        const dagtype = dag === 0 ? "zo" : dag === 6 ? "za" : "ma-vr";
        const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        const regels = ((uit.regels ?? []) as Array<Record<string, unknown>>).slice(0, 60).map((r) => {
          const cat = String(r.categorie ?? "");
          let t = (tarieven ?? []).find((x) => x.categorie === cat && norm(x.omschrijving) === norm(String(r.omschrijving ?? "")));
          if (!t && cat === "arbeid") t = (tarieven ?? []).find((x) => x.categorie === "arbeid" && x.dagtype === dagtype) ?? (tarieven ?? []).find((x) => x.categorie === "arbeid");
          if (!t && (cat === "km" || cat === "overnachting")) t = (tarieven ?? []).find((x) => x.categorie === cat);
          if (!t) t = (tarieven ?? []).find((x) => x.categorie === cat && (norm(x.omschrijving).includes(norm(String(r.omschrijving ?? ""))) || norm(String(r.omschrijving ?? "")).includes(norm(x.omschrijving))));
          if (t && cat === "arbeid") t = (tarieven ?? []).find((x) => x.categorie === "arbeid" && x.dagtype === dagtype) ?? t;
          const aantal = Number(r.aantal) || 0;
          const per = r.per == null ? (t && t.eenheid_per ? 1 : null) : Number(r.per);
          return {
            categorie: cat, omschrijving: t ? t.omschrijving : String(r.omschrijving ?? ""), tarief_id: t ? t.id : null,
            aantal: cat === "transport" ? aantal : Math.round(aantal), per: per == null ? null : (t && t.eenheid_per === "uur" ? per : Math.round(per)),
            prijs: t ? Number(t.prijs) : 0, eenheid_n: t ? t.eenheid_n : "", eenheid_per: t ? t.eenheid_per : "", eenheid_totaal: t ? t.eenheid_totaal : "",
            namen: String(r.namen ?? ""), zekerheid: String(r.zekerheid ?? "middel"), gekoppeld: !!t,
          };
        }).filter((r) => r.aantal > 0);
        await log(wie, String(body.log ?? ""));
        return json({ ok: true, datum, afgetekend_door: uit.afgetekend_door ?? "", opmerking: String(uit.opmerking ?? ""), leesbaarheid: String(uit.leesbaarheid ?? "matig"), regels });
      }
      case "bedrijf_logo": {
        if (!admin) throw new Error("alleen administratie");
        const b64 = String(fields.logo_b64 ?? "");
        if (!b64) throw new Error("geen logo meegestuurd");
        const mt = (b64.match(/^data:(image\/[a-z+]+);/) ?? [])[1] ?? "image/png";
        const pad = await uploadB64(b64, mt, mt.includes("svg") ? "svg" : mt.includes("jpeg") ? "jpg" : "png");
        const { error } = await db.from("wb_bedrijf").update({ logo_pad: pad }).eq("id", id);
        if (error) throw error;
        break;
      }
      case "testdata_wissen": {
        // Voor de pilot: alle bonnen (regels via cascade) en facturen weg; stamgegevens blijven staan.
        if (!admin) throw new Error("alleen administratie");
        if (String(body.bevestiging ?? "") !== "WISSEN") throw new Error("bevestiging ontbreekt");
        const { error: e1 } = await db.from("wb_bon").update({ factuur_id: null }).not("factuur_id", "is", null);
        if (e1) throw e1;
        const { error: e2 } = await db.from("wb_factuur").delete().gt("id", 0);
        if (e2) throw e2;
        const { error: e3 } = await db.from("wb_bon").delete().gt("id", 0);
        if (e3) throw e3;
        break;
      }
      default:
        return json({ fout: "onbekende actie" }, 400);
    }
    await log(wie, String(body.log ?? ""));
    return json({ ok: true });
  } catch (e) {
    console.error(actie, e);
    return json({ fout: String((e as Error)?.message ?? e) }, 500);
  }
});

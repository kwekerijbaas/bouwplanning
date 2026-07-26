# SPRILA 2026 — beoordeling regeling + concept-aanvraag

**Onderwerp:** elektrische vrachtwagens, zonnepanelen op dak, accu die laadt en ontlaadt
**Voor:** Kwekerij Baas (Dieter)
**Datum:** 26 juli 2026
**Status:** concept — bedragen en details nog verifiëren op rvo.nl (zie waarschuwing onderaan)

---

## 1. Korte conclusie

Drie dingen vooraf, want de aanname in de opdracht klopt net niet:

1. **SPRILA is geen SDE.** SDE++ is een *exploitatie*subsidie: je krijgt jarenlang een
   bedrag per opgewekte kWh. SPRILA is een *investerings*subsidie: eenmalig een bedrag
   terug op wat je koopt en aanlegt. Andere regeling, ander loket-moment, andere spelregels.
2. **SPRILA gaat niet over de vrachtwagens zelf.** Die vallen onder **AanZET**.
3. **SPRILA vergoedt de zonnepanelen niet.** Zonnepanelen zitten in **SDE++** (of fiscaal
   via EIA). Ze mogen wél in het verhaal van je SPRILA-aanvraag staan als onderbouwing —
   ze zijn alleen geen subsidiabele kostenpost binnen SPRILA.

Wat SPRILA wél doet, past goed op jullie plan: **laadstations voor de vrachtwagens** en de
**stationaire accu** die eromheen zit, inclusief de aanleg (kabels, trafo, netaansluiting,
grondwerk, bestrating, vergunningen).

Jullie plan valt dus uiteen in **drie aparte aanvragen bij drie regelingen**:

| Onderdeel | Regeling | Loket open in 2026 |
|---|---|---|
| Laadstations + stationaire accu + aanleg | **SPRILA** | 20 jan 09:00 – **18 dec 2026 12:00** |
| Zonnepanelen op dak (≥ 15 kWp) | **SDE++** | **27 okt – 26 nov 2026** |
| De elektrische vrachtwagens | **AanZET** | 2e ronde **29 sep 09:00 – 16 okt 2026 12:00** |

Alle drie de loketten zijn dit najaar open. Dat is krap maar haalbaar — mits je nu begint,
want er zit één harde valkuil in (zie §5).

---

## 2. Wat SPRILA precies is

**Voluit:** Subsidieregeling Private Laadinfrastructuur bij bedrijven.
**Uitvoerder:** RVO, namens het Ministerie van Klimaat en Groene Groei.
**Doel:** ondernemers helpen laadinfrastructuur op eigen (of gehuurd) terrein aan te leggen
voor hun eigen elektrische voertuigen.

**Wie mag aanvragen:** ondernemers met KVK-inschrijving, gevestigd in Nederland, met eigen
elektrische voertuigen — personenauto's, bestelbussen, taxi's, bussen én **vrachtwagens** —
of bouwmachines. Kwekerij Baas past hier zonder meer in.

**Belangrijk verschil met SPULA:** SPULA is de variant voor *publiek toegankelijke*
laadinfrastructuur voor zwaar vervoer. Jullie laadplein op eigen terrein voor eigen trucks
is **privaat** → SPRILA. Let op: je mag de laadpunten gedurende de instandhoudingstermijn
níét openbaar toegankelijk maken (zie §4).

### Nieuw in 2026, en gunstig voor jullie

- Er is een **categorie DC-laadstations vanaf 550 kW** bijgekomen, specifiek omdat er veel
  vraag was vanuit bedrijven die elektrische vrachtwagens laden. Deze regeling is dit jaar
  dus letterlijk verbreed richting jullie use case.
- Het budget voor **stationaire batterijen is fors verhoogd**, van circa €18,5 mln naar
  **€45 mln**.
- De losse adviessubsidie (SPRILA Advies, 50% tot €3.500) is **vervallen**: sinds
  19 december 2025 kun je daar niet meer voor aanvragen. In 2026 draait alles om aanschaf
  en aanleg. Adviesuren meenemen als aparte subsidiepost kan dus niet meer.
- Totaalbudget investeringssubsidie 2026: circa **€87,5 mln**.

---

## 3. Past jullie plan erin? Onderdeel voor onderdeel

### 3a. Laadstations voor de vrachtwagens — ja, kern van de regeling

Zwaar transport laadt in de praktijk op DC. De subsidie is een **vast bedrag per
laadstation**, ingedeeld op vermogensklasse.

Cruciale rekenregel: **de klasse wordt bepaald door het totaalvermogen van het laadstation,
niet door het vermogen per laadpunt.** Een station van 240 kW met twee punten van elk max
120 kW valt in de categorie "vanaf 220 kW". Dit is precies waar aanvragen misgaan — check
dit voordat je de klasse invult.

Indicatieve bedragen voor **mkb** (grote bedrijven krijgen grofweg de helft):

| Categorie | Indicatief bedrag (mkb) |
|---|---|
| AC vanaf 11 kW, 1 laadpunt | € 800 |
| AC duopaal, 2 × 11 kW | € 1.600 |
| AC vanaf 43 kW, 1 laadpunt | € 1.760 |
| AC duopaal, 2 × 43 kW | € 3.520 |
| DC vanaf 100 kW | € 3.200 |
| DC vanaf 220 kW | € 7.040 |
| DC vanaf 350 kW | € 11.200 |
| **DC vanaf 550 kW** | **€ 17.600** |

⚠️ Deze bedragen komen uit secundaire bronnen (zie §11) — rvo.nl was in deze sessie niet
bereikbaar. **Verifieer ze met de officiële RVO-rekentool** vóór je iets indient:
`rvo.nl/form/sprila-rekentool`.

### 3b. De accu die laadt en ontlaadt — ja, mits je aan de 70%-eis voldoet

Dit is het onderdeel waar de meeste aanvragen op stranden, dus lees dit goed.

Een **stationaire batterij** is subsidiabel, maar alleen als hij **aantoonbaar functioneel
gekoppeld is aan de laadinfrastructuur**. Concreet:

> **Minimaal 70% van het aantal kWh dat uit de stationaire batterij wordt ontladen, moet
> aantoonbaar naar de laadstations gaan.**

Dat is een harde, meetbare eis. Gevolgen voor jullie ontwerp:

- De accu mag níét primair dienen om de kwekerij (klimaatinstallatie, belichting, koeling)
  te voeden of om op de energiemarkt te handelen. Doe je dat wel, dan zak je onder de 70%
  en loop je risico op terugvordering.
- Je moet dit kunnen **aantonen** — dus je energiemanagementsysteem moet de ontlaadstromen
  per bestemming kunnen loggen. Neem dit op in het bestek bij je installateur.

Subsidiegrondslag: circa **€300 per kWh opslagcapaciteit** (was €350; verlaagd omdat
batterijprijzen zijn gedaald), met een subsidie van ongeveer **€85 per kWh voor mkb** en
**€60 per kWh voor grote bedrijven**.

⚠️ Over de **maximale capaciteit** lopen bronnen uiteen: genoemd worden zowel "max 1.400 kWh
per stationaire batterij" (mogelijk een SPULA-grens) als "max 1.000 kWh per laadpunt". Ook
wordt bij batterijen een **minimale subsidie van €25.000** genoemd. Dit moet je op rvo.nl
verifiëren voordat je de accu dimensioneert — het kan je ontwerp raken.

**Let op de formulering "accu laden en legen op vrachtwagens".** Als je hiermee bedoelt dat
je de **accu's ván de vrachtwagens** wilt gebruiken als buffer voor het bedrijf
(bidirectioneel / V2G), dan is dat iets anders dan een stationaire batterij en waarschijnlijk
niet subsidiabel onder deze post — de regeling spreekt over een *stationaire* batterij die
*aan de laadstations* levert. Laat me weten welke van de twee je bedoelt; het verandert de
aanvraag wezenlijk.

**Leverancier: Draccu (Zuidwolde).** Draccu levert batterijen aan agrarische bedrijven en
koopt direct bij fabrikanten in — prima partij voor de offerte, en ze kennen de combinatie
accu + zonnestroom + netaansluiting. Maar let op één ding: hun **standaard use case is
precies de use case die SPRILA níét subsidieert**. Draccu's gebruikelijke opzet is overdag
zonnestroom opslaan en 's avonds het bedrijf zelf voeden (besparing 15–20 ct/kWh). Als de
accu zo wordt ingeregeld, gaat het grootste deel van de ontlading naar de kwekerij en niet
naar de laadstations — dan haal je de 70%-eis niet en is de accu niet subsidiabel onder
SPRILA.

Neem dit dus expliciet mee in je uitvraag aan Draccu:

- de accu moet **primair de laadstations voeden**, met de kwekerij als restpost;
- het **energiemanagementsysteem moet de laadstations prioriteren** in de aansturing;
- het systeem moet **ontlaadstromen per bestemming meten en loggen**, zodat je richting RVO
  kunt aantonen dat je boven de 70% zit;
- vraag Draccu dit **op papier te bevestigen in de offerte** — dat document gebruik je als
  bijlage bij de aanvraag.

Vraag ze meteen ook een **gespecificeerde offerte excl. btw** met de posten los (accu,
omvormer, EMS, installatie, aansluitwerk), want de begroting in de aanvraag moet per
kostenpost worden onderbouwd. En: **laat de offerte offerte blijven — niet tekenen** tot de
aanvraag is ingediend (§5).

### 3c. Zonnepanelen op dak — niet via SPRILA

Zonnepanelen zijn **geen subsidiabele kostenpost** binnen SPRILA. De regeling vergoedt de
laadinfrastructuur en de bijbehorende elektrotechniek, niet de opwek.

Wat je wél moet doen:

- **In je SPRILA-projectplan de zonnepanelen noemen als onderbouwing.** Het verhaal "eigen
  opwek op het dak → accu buffert → trucks laden op zonnestroom zonder netverzwaring" maakt
  je aanvraag inhoudelijk sterker en verklaart waarom de accu functioneel gekoppeld is aan
  het laden.
- **Voor de panelen zelf apart SDE++ aanvragen**, ronde **27 oktober – 26 november 2026**,
  budget circa €8 miljard. Vanaf 15 kWp. Let op: voor zon-PV geldt in deze ronde een
  **strengere eis** — je moet met een **transportindicatie van de netbeheerder** aantonen
  dat je daadwerkelijk kunt terugleveren. Vraag die indicatie **nu** aan bij Liander/Stedin;
  daar zitten lange doorlooptijden op en zonder indicatie is je SDE++-aanvraag kansloos.
- Alternatief of aanvullend voor de panelen: **EIA** (fiscale aftrek) en/of **MIA/Vamil**.

### 3d. De vrachtwagens zelf — AanZET

Niet SPRILA maar **AanZET** (Aanschafsubsidie Zero-Emissie Trucks). Voor voertuigen in
categorie N3 of N2 vanaf 10.000 kg, batterij-elektrisch of waterstof.

- Subsidiepercentage 2026: circa **6,1% tot 29%**, met maximumbedragen tussen circa
  **€15.200 en €115.200** per truck, afhankelijk van voertuigklasse en bedrijfsgrootte.
- **Tweede openstelling 2026: 29 september 09:00 – 16 oktober 2026 12:00.** Dat is een kort
  venster van ruim twee weken. De eerste ronde (27 januari, €78 mln) is al geweest.
- AanZET wordt op volgorde van binnenkomst afgehandeld en gaat historisch snel vol. Zorg
  dat je op dag één indient.

---

## 4. Voorwaarden SPRILA — de harde eisen

| Onderwerp | Eis |
|---|---|
| **Aanvraagperiode 2026** | 20 januari 09:00 t/m **18 december 2026 12:00** |
| **Verdeling** | Op **volgorde van binnenkomst** — vol is vol |
| **Beslistermijn** | Binnen **13 weken** |
| **Inloggen** | **eHerkenning niveau 3 (eH3)** minimaal, via Mijn RVO |
| **Locatie** | Laadinfrastructuur in Nederland, op eigen of gehuurd terrein |
| **Instandhouding** | Laadstations én batterij minimaal **24 maanden actief in gebruik** |
| **Niet openbaar** | In die 24 maanden **niet openbaar toegankelijk** maken |
| **Minimum per locatie** | Subsidiebedrag ten minste circa **€2.500** per laadlocatie |
| **Batterij** | ≥ **70%** van ontladen kWh moet naar de laadstations |
| **Staatssteunplafond** | Max **40%** van de subsidiabele kosten voor mkb, **20%** voor grote bedrijven |
| **Indieningstermijn** | In hetzelfde kalenderjaar, of binnen **13 weken** na afronding van de werkzaamheden |

### Subsidiabele kosten

Ruimer dan alleen de laadpaal. Subsidiabel is alles wat nodig is om de laadinfrastructuur te
bouwen, installeren, verbeteren en uit te breiden:

- de laadstations en bijbehorende technische apparatuur;
- elektrotechnische installatie en verbetering: **voedingskabels, transformatoren**,
  netaansluiting, aansluiting op elektriciteitsopslag;
- **civieltechnisch werk**: grondwerk, terrein- en wegaanpassingen, bestrating;
- **installatiekosten** en **vergunningskosten**.

Voor een vrachtwagenlaadplein is dat civiele en elektrotechnische deel vaak een groot deel
van de investering — neem het volledig mee in je begroting.

### Mkb of groot bedrijf

Dit bepaalt of je 40% of 20% mag ontvangen, én of je het hoge of het lage bedrag per
laadstation krijgt (grofweg factor 2). Kwekerij Baas is naar verwachting **mkb**, maar de
Europese mkb-toets kijkt óók naar verbonden en partnerondernemingen: als er holdings of
deelnemingen boven of naast de kwekerij hangen, tel je die mee. Loop dit na vóór indiening —
een onjuiste mkb-verklaring is een terugvorderingsgrond.

---

## 5. De valkuil die je project kan kosten

Er zijn **twee verschillende aanvraagroutes**, met een omslagpunt bij **€25.000 subsidie**:

**Minder dan €25.000 subsidie → de-minimis**
Je vraagt aan **nadat** de laadinfrastructuur is geplaatst, uiterlijk **13 weken na
plaatsing**. Je hebt dan facturen en betaalbewijzen nodig. Je moet een
**de-minimisverklaring** invullen: alle overheidssteun aan je onderneming over de afgelopen
drie belastingjaren telt mee tegen het de-minimisplafond.

**€25.000 of meer subsidie → reguliere staatssteunregels**
Je moet aanvragen **vóórdat je opdracht geeft** voor de aanleg. Dit is de eis van het
zogeheten stimulerend effect: subsidie mag alleen investeringen uitlokken die anders niet
plaatsvinden. Teken je eerst het contract met de installateur en vraag je daarna aan, dan is
je aanvraag **niet meer te redden** — geen coulance, geen uitzondering.

👉 **Gegeven de omvang van jullie plan (DC-laadstations voor trucks plus een accu) zit je
vrijwel zeker boven de €25.000. Dat betekent: géén opdracht tekenen, geen aanbetaling doen,
geen bestelling plaatsen totdat de SPRILA-aanvraag is ingediend.** Offertes opvragen mag
wel — sterker nog, die heb je nodig als bijlage. Maar de handtekening onder de opdracht
komt ná de indiening.

Als er al iets besteld is: laat het me weten, dan kijken we wat er nog wel kan.

---

## 6. Concept-aanvraag

De aanvraag loopt via een online formulier in **Mijn RVO**. Hieronder de antwoorden die je
daar invult, plus de projectomschrijving die je kunt overnemen. Alles tussen `[ ]` moet ik
nog van jullie hebben (zie §9).

### 6.1 Aanvraaggegevens

| Veld | In te vullen |
|---|---|
| Naam onderneming | `[statutaire naam, bijv. Kwekerij Baas B.V.]` |
| KVK-nummer | `[KVK-nummer]` |
| Vestigingsadres | `[adres]` |
| Locatie laadinfrastructuur | `[adres laadlocatie, indien afwijkend]` |
| Eigendom / huur terrein | `[eigendom / huur — bij huur: toestemming verhuurder bijvoegen]` |
| Contactpersoon | Dieter `[achternaam]`, dieter@kwekerijbaas.nl, `[telefoon]` |
| Type onderneming | Mkb `[te bevestigen na mkb-toets incl. verbonden ondernemingen]` |
| Aanvraagroute | ≥ €25.000 → staatssteun, indienen **vóór opdrachtverlening** |
| SBI-code | `[SBI-code, tuinbouw]` |
| IBAN | `[IBAN t.n.v. de aanvragende rechtspersoon]` |

### 6.2 Op te geven laadinfrastructuur

| # | Type | Totaalvermogen station | Aantal laadpunten | Categorie | Aantal | Indicatief bedrag |
|---|---|---|---|---|---|---|
| 1 | DC | `[… kW]` | `[…]` | `[bijv. DC vanaf 550 kW]` | `[…]` | `[…]` |
| 2 | AC | `[… kW]` | `[…]` | `[bijv. AC duopaal 2 × 11 kW]` | `[…]` | `[…]` |

**Stationaire batterij**

| Veld | In te vullen |
|---|---|
| Opslagcapaciteit | `[… kWh]` |
| Vermogen | `[… kW]` |
| Aandeel ontlading naar laadstations | ≥ 70% (contractueel vast te leggen met installateur) |
| Wijze van aantonen | Energiemanagementsysteem met logging van ontlaadstromen per bestemming |
| Indicatief bedrag | `[… kWh × € 85 (mkb)]` |

**Begroting subsidiabele kosten**

| Kostenpost | Bedrag excl. btw |
|---|---|
| Laadstations DC | `[…]` |
| Laadstations AC | `[…]` |
| Stationaire batterij | `[…]` |
| Netaansluiting / verzwaring | `[…]` |
| Voedingskabels, trafo, schakelmateriaal | `[…]` |
| Energiemanagementsysteem | `[…]` |
| Civiel werk (grondwerk, bestrating, fundatie) | `[…]` |
| Installatiekosten | `[…]` |
| Vergunningen | `[…]` |
| **Totaal subsidiabele kosten** | `[…]` |
| Gevraagde subsidie | `[…]` (toets: ≤ 40% van totaal bij mkb) |

### 6.3 Projectomschrijving (concepttekst — aan te vullen en over te nemen)

> Kwekerij Baas verduurzaamt het eigen transport door over te stappen op elektrische
> vrachtwagens voor de aan- en afvoer van `[producten/stromen]`. Om die overstap mogelijk te
> maken, realiseren wij op ons eigen terrein aan `[adres]` een private laadvoorziening,
> uitsluitend bestemd voor onze eigen wagenpark. De laadvoorziening wordt niet openbaar
> toegankelijk gemaakt.
>
> **Wagenpark.** Wij zetten `[aantal]` elektrische vrachtwagens in `[categorie N2/N3]`, met
> een gemiddelde dagelijkse energiebehoefte van circa `[… kWh]` per voertuig. De voertuigen
> keren dagelijks terug naar de vestiging en laden overwegend `[’s nachts / tussen ritten]`.
>
> **Laadinfrastructuur.** Wij plaatsen `[aantal]` DC-laadstations met een totaalvermogen van
> `[… kW]` en `[aantal]` AC-laadstations van `[… kW]`, aangevuld met de benodigde
> elektrotechnische en civiele werken.
>
> **Netcapaciteit als knelpunt.** De beschikbare netcapaciteit op onze aansluiting bedraagt
> `[… kVA]`. Gelijktijdig laden van het wagenpark op vol vermogen overschrijdt deze
> capaciteit. Netverzwaring is `[niet op afzienbare termijn beschikbaar / kostbaar en pas
> mogelijk in …]`. Zonder aanvullende maatregelen is elektrificatie van het wagenpark op deze
> locatie daarom niet realiseerbaar.
>
> **Stationaire batterij als oplossing.** Wij realiseren daarom een stationaire batterij van
> `[… kWh]` die functioneel gekoppeld is aan de laadinfrastructuur. De batterij laadt op
> momenten dat de vraag laag is en de opwek hoog, en levert tijdens laadpieken extra vermogen
> aan de laadstations. Zo verhogen wij de laadcapaciteit binnen de bestaande netaansluiting,
> zonder netverzwaring. De batterij wordt aangestuurd door een energiemanagementsysteem dat
> de laadstations prioriteert; ten minste 70% van de uit de batterij ontladen energie gaat
> naar de laadstations, en dit wordt per bestemming gemeten en gelogd.
>
> **Eigen opwek.** Op de daken van `[gebouwen]` realiseren wij `[… kWp]` aan zonnepanelen
> (separaat gefinancierd, buiten deze aanvraag). De combinatie van eigen opwek, buffering in
> de stationaire batterij en slim laden zorgt ervoor dat de vrachtwagens grotendeels op eigen
> duurzaam opgewekte stroom rijden, en dat de piekbelasting op het net beperkt blijft.
>
> **Planning.** Opdrachtverlening `[maand]`, realisatie `[maand]` tot `[maand]`,
> ingebruikname `[maand]`. De laadinfrastructuur en de batterij blijven ten minste 24
> maanden na ingebruikname actief in gebruik.
>
> **Noodzaak van de subsidie.** Zonder subsidie is de businesscase op dit moment niet
> sluitend: `[korte onderbouwing — meerkosten t.o.v. diesel, terugverdientijd, geen
> alternatief zonder netverzwaring]`. De subsidie is daarmee bepalend voor de beslissing om
> deze investering nu te doen.

---

## 7. Bijlagenchecklist

- [ ] **Offertes** voor laadstations, batterij en aanleg (gespecificeerd per kostenpost,
      excl. btw, nog niet ondertekend als opdracht) — accu via **Draccu**
- [ ] **Schriftelijke bevestiging van Draccu** dat de accu de laadstations prioriteert en dat
      de ontlaadstromen per bestemming worden gemeten en gelogd (onderbouwing 70%-eis)
- [ ] **Technische specificaties** laadstations — met expliciet het **totaalvermogen per
      station** en het aantal laadpunten
- [ ] **Technische specificatie batterij** — capaciteit in kWh, vermogen, en de beschrijving
      hoe de 70%-eis wordt geborgd en gemeten
- [ ] **Situatietekening / plattegrond** van de laadlocatie
- [ ] **Begroting** van alle subsidiabele kosten
- [ ] **Mkb-verklaring** (inclusief verbonden en partnerondernemingen)
- [ ] **Staatssteun- of de-minimisverklaring**, afhankelijk van de route
- [ ] **Bewijs van eigendom of huurovereenkomst** van het terrein; bij huur: schriftelijke
      toestemming van de verhuurder
- [ ] **Machtiging** als een intermediair namens jullie indient
- [ ] Bij AanZET (aparte aanvraag): koopovereenkomst of financial-leasecontract van de trucks
- [ ] Bij SDE++ (aparte aanvraag): **transportindicatie van de netbeheerder**

---

## 8. Stappenplan met data

| Wanneer | Wat | Waarom nu |
|---|---|---|
| **Deze week** | Transportindicatie aanvragen bij de netbeheerder | Lange doorlooptijd; blokkeert SDE++ in november |
| **Deze week** | eHerkenning niveau 3 controleren of aanvragen | Zonder eH3 kun je niet indienen; aanvraag kost dagen |
| **Deze week** | Mkb-toets uitvoeren (incl. verbonden ondernemingen) | Bepaalt 40% vs 20% en de bedragen per station |
| **Aug** | Offertes opvragen bij **Draccu** (accu) en een laadpaalpartij — **nog geen opdracht tekenen** | Boven €25k moet de aanvraag vóór opdrachtverlening |
| **Aug** | Draccu laten bevestigen dat de accu de laadstations prioriteert (70%-eis) | Zonder die borging is de accu niet subsidiabel |
| **Aug** | Laadbehoefte doorrekenen: kWh/dag, gelijktijdigheid, accugrootte | Bepaalt vermogensklassen en dus het subsidiebedrag |
| **Aug** | Bedragen verifiëren met de RVO-rekentool | Bedragen hieronder zijn indicatief |
| **Aug/sep** | **SPRILA indienen** | Volgorde van binnenkomst; niet wachten tot december |
| **29 sep – 16 okt** | **AanZET indienen** voor de trucks | Kort venster, gaat snel vol — dag één indienen |
| **27 okt – 26 nov** | **SDE++ indienen** voor de zonnepanelen | Enige ronde in 2026 |
| **Na toekenning** | Pas dán opdracht geven en realiseren | |
| **Na realisatie** | Vaststelling aanvragen; 24 maanden in gebruik houden, niet openbaar | Instandhoudingsverplichting |

---

## 9. Wat ik nog van jullie nodig heb

Om de aanvraag af te maken in plaats van te schetsen:

1. **Statutaire naam, KVK-nummer, SBI-code, adres van de laadlocatie**, en of het terrein
   eigendom of huur is.
2. **Mkb of niet** — zijn er holdings, deelnemingen of verbonden ondernemingen?
3. **Aantal en type vrachtwagens**, en per truck de accucapaciteit en de dagelijkse
   energiebehoefte in kWh.
4. **Laadprofiel**: laden ze 's nachts, tussen ritten, of allebei? Hoeveel moeten er
   gelijktijdig kunnen laden?
5. **Huidige netaansluiting in kVA**, en wat de netbeheerder over verzwaring heeft gezegd.
6. **Beoogd aantal en vermogen van de laadstations** (of laat het ontwerp aan de installateur
   en geef de offerte door).
7. **De offerte van Draccu** zodra die er is — plus de beoogde accugrootte in kWh, en —
   belangrijk — **of je de accu ook voor de kwekerij zelf wilt inzetten**. Zo ja, dan moeten
   we rekenen aan de 70%-eis, want dat is precies waar deze aanvraag op kan stranden.
8. **Wat je precies bedoelt met "accu laden en legen op vrachtwagens"**: een stationaire
   accu naast het laadplein, of de accu's van de trucks zelf als buffer (V2G)?
9. **Vermogen van de beoogde zonnepanelen in kWp** en of er al een offerte ligt.
10. **Is er al iets besteld of een opdracht getekend?** Dit is de belangrijkste vraag — zie §5.

---

## 10. Waarschuwing bij de cijfers

**rvo.nl was in deze werksessie niet bereikbaar** — het netwerkbeleid van deze omgeving
blokkeert het domein (403 op de proxy). De regelingsystematiek, termijnen en voorwaarden
hierboven zijn opgebouwd uit zoekresultaten en secundaire bronnen (adviesbureaus,
brancheorganisaties, Ondernemersplein).

Dat betekent concreet:

- De **structuur, voorwaarden en termijnen** zijn consistent over meerdere onafhankelijke
  bronnen en betrouwbaar genoeg om op te plannen.
- De **exacte subsidiebedragen per categorie** en de **maximale batterijcapaciteit** zijn
  **niet geverifieerd op de bron** en op sommige punten spreken bronnen elkaar tegen (met
  name over 1.000 vs 1.400 kWh en over de minimumsubsidie bij batterijen).
- Verifieer vóór indiening in elk geval: de bedragentabel, de batterijgrenzen, en de precieze
  bijlagenlijst. Gebruik daarvoor:
  - `rvo.nl/subsidies-financiering/laadinfrastructuur/sprila-aanschaf`
  - `rvo.nl/form/sprila-rekentool` (officiële rekentool)
  - `rvo.nl/subsidies-financiering/laadinfrastructuur/rekenvoorbeelden-sprila`
  - `rvo.nl/subsidies-financiering/sprila-en-spula/sprila-veelgestelde-vragen`

---

## 11. Bronnen

- [Subsidieregeling Private Laadinfrastructuur bij bedrijven (SPRILA) — RVO](https://www.rvo.nl/subsidies-financiering/laadinfrastructuur/sprila-aanschaf)
- [SPRILA: Veelgestelde vragen — RVO](https://www.rvo.nl/subsidies-financiering/sprila-en-spula/sprila-veelgestelde-vragen)
- [Rekenvoorbeelden en capaciteitsberekeningen voor SPRILA — RVO](https://www.rvo.nl/subsidies-financiering/laadinfrastructuur/rekenvoorbeelden-sprila)
- [SPRILA-rekentool — RVO](https://www.rvo.nl/form/sprila-rekentool)
- [Subsidieregelingen laadinfrastructuur: SPRILA en SPULA — RVO](https://www.rvo.nl/subsidies-financiering/laadinfrastructuur)
- [SPRILA Advies — RVO](https://www.rvo.nl/subsidies-financiering/laadinfrastructuur/sprila-advies)
- [Aanschafsubsidie Zero-Emissie Trucks (AanZET) — RVO](https://www.rvo.nl/subsidies-financiering/aanzet)
- [Ondernemers krijgen in 2026 meer tijd voor subsidieaanvraag SDE++ — RVO](https://www.rvo.nl/nieuws/meer-tijd-voor-aanvraag-sde-2026)
- [Subsidie private laadstations (SPRILA) — Ondernemersplein](https://ondernemersplein.overheid.nl/subsidies-en-regelingen/sprila/)
- [SPriLa: kopen van laadpalen op eigen terrein — Vrachtwagenheffingsbeleid](https://www.vrachtwagenheffingsbeleid.nl/subsidies/sprila)
- [Ook in 2026 weer subsidie voor emissievrije vrachtwagens — Vrachtwagenheffingsbeleid](https://www.vrachtwagenheffingsbeleid.nl/actueel/nieuws/2026/01/19/ook-in-2026-weer-subsidie-voor-emissievrije-vrachtwagens)
- [Meer subsidie beschikbaar voor laadpaal of batterij (SPRiLa) — BOVAG](https://mijn.bovag.nl/actueel/nieuws/meer-subsidie-beschikbaar-voor-laadpaal-of-batterij-sprila)
- [Met SPRILA en SPULA krijg je subsidie voor laadinfra — Techniek Nederland](https://www.technieknederland.nl/nieuws/met-sprila-en-spula-krijg-je-subsidie-voor-laadinfra)
- [Wijzigingen en openstelling SPriLa, SPuLa en STour in 2026 — EIFFEL Subsidies](https://eiffelsubsidies.nl/update/wijzigingen-en-openstelling-subsidieregelingen-sprila-spula-en-stour-in-2026/)
- [De SPRILA-subsidie in 2026: alle wijzigingen op een rij — Moore MKW](https://moore-mkw.nl/actueel/belangrijke-wijzigingen-in-sprila-2026)
- [SDE++-subsidie opent 22 september 2026 met € 8 miljard budget — Moore MKW](https://moore-mkw.nl/actueel/sde-2026-openstelling)
- [SDE++ 2026 in september open met 8 miljard euro budget — Solar & Storage Magazine](https://solarmagazine.nl/nieuws-zonne-energie/i42972/sde-2026-in-september-open-met-8-miljard-euro-budget-nieuwe-categorie-zonnepanelen-langs-infra)
- [Draccu](https://draccu.nl/) — beoogd leverancier accu
- [Draccu levert accu op zonnestroom aan bedrijven — Rabo & Co](https://raboenco.rabobank.nl/nl/articles/101580/)

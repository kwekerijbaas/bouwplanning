# SPRILA 2026 — beoordeling regeling + concept-aanvraag

**Onderwerp:** elektrische vrachtwagens, zonnepanelen op dak, accu die laadt en ontlaadt
**Voor:** Kwekerij Baas (Dieter)
**Datum:** 26 juli 2026
**Aanvraag:** stationaire accu **1.000 kWh** + DC-laadstations — *configuratie in optimalisatie, zie §2*
**Indicatief subsidiebedrag:** **€ 99.080** bij 2× 300 kW → **€ 102.600 tot € 107.400** bij een betere indeling
**Route:** staatssteun (≥ €25.000) — **indienen vóórdat je opdracht geeft**
**Status:** concept — bedragen nog verifiëren op rvo.nl (zie §10)

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

### De gekozen aanvraag

| Onderdeel | Specificatie | Categorie | Indicatief bedrag (mkb) |
|---|---|---|---|
| Stationaire accu | 1.000 kWh | max. toegestaan per laadlocatie | € 85.000 |
| DC-laadstations | *configuratie nog te kiezen — zie §2* | | € 14.080 – € 22.400 |
| | | **Totaal** | **€ 99.080 – € 107.400** |

Je zit met 1.000 kWh **exact op het maximum** dat SPRILA per laadlocatie vergoedt — goed
gekozen, meer plaatsen mag wel maar levert niets extra's op.

**Drie dingen die je nu meteen moet weten. Lees ze alle drie, ze kosten alle drie geld:**

1. **Vanaf nu geldt een tekenverbod.** Boven €25.000 moet de aanvraag binnen zijn vóórdat je
   opdracht geeft. Teken je eerder bij Draccu, dan is bijna €100.000 weg. Zie §5.
2. **2× 300 kW is de slechtste van alle configuraties.** Je zit net boven een categoriegrens
   en krijgt daardoor exact evenveel subsidie als bij 220 kW, maar betaalt wél voor zwaardere
   kabels. Er zijn drie betere varianten, tot **€8.320** meer. Zie §2 — dit is de belangrijkste
   sectie van dit document geworden.
3. **De 70%-eis wordt bij 1.000 kWh het knelpunt van deze aanvraag.** Dit is waar €85.000 op
   kan stranden, en het raakt hoe je de accu mag gebruiken. Zie §3.

---

## 2. Maximaal rendement — welke configuratie levert het meeste op

Draccu meldt terecht dat 350 kW om zwaardere bekabeling vraagt. Dat verandert de afweging,
maar het maakt de conclusie juist scherper: **2× 300 kW is de slechtste optie van allemaal.**

### De onderliggende regel

De subsidie is een **vast bedrag per laadstation per vermogenscategorie**. Reken je de
bedragen terug naar de categoriegrens, dan valt op dat ze exact lineair zijn:

| Categoriegrens | Bedrag (mkb) | Per kW |
|---|---|---|
| 100 kW | € 3.200 | € 32,00 |
| 220 kW | € 7.040 | € 32,00 |
| 350 kW | € 11.200 | € 32,00 |
| 550 kW | € 17.600 | € 32,00 |

**Je krijgt precies €32 per kW — maar alleen over de categoriegrens, niet over wat je
werkelijk installeert.** Daaruit volgt één regel:

> **Ga nooit tússen twee grenzen in zitten.** Installeer exact op een grens, of ga door naar
> de volgende. Elke kW daarboven krijg je niet vergoed.

Bij 300 kW zit je 80 kW boven de grens van 220. Je betaalt voor 300 kW aan hardware en
zwaardere kabel, en wordt afgerekend als 220 kW: **€23,47 per kW in plaats van €32,00.**

### De opties naast elkaar

Stroomsterktes indicatief bij 400 V driefasen, inclusief omzetverliezen — je installateur
rekent de definitieve waarden.

| Optie | Laadvermogen | Subsidie | Per kW | Stroom per kabelrun | Totale stroom |
|---|---|---|---|---|---|
| **A.** 2× 220 kW | 440 kW | € 14.080 | € 32,00 | ~335 A | ~670 A |
| **B.** 2× 300 kW *(huidig plan)* | 600 kW | € 14.080 | € 23,47 | ~455 A | ~910 A |
| **C.** 1× 550 kW (2× 275 kW) | 550 kW | **€ 17.600** | € 32,00 | ~835 A | **~835 A** |
| **D.** 2× 350 kW | 700 kW | **€ 22.400** | € 32,00 | ~530 A | ~1.065 A |

Optie C kan, want de categorie vanaf 550 kW is in 2026 expliciet gedefinieerd als
**"DC ≥ 550 kW óf 2 × 275 kW"** en is bewust connector-onafhankelijk — zowel zwaardere
CCS-laders als MCS vallen eronder. Twee laadpunten van 275 kW in één station tellen dus als
één station van 550 kW.

### Wat dit betekent

**Optie B is dominant slecht.** Ze levert exact hetzelfde op als optie A (€14.080), maar
vraagt fors zwaardere kabels: ~455 A per run tegen ~335 A. Je betaalt de meerprijs van 300 kW
zonder er één euro subsidie voor terug te zien. Als de bekabeling het knelpunt is, is de
juiste reactie dus **niet** "dan blijven we op 300 kW" — dat is de slechtst denkbare uitkomst.

**Optie C is de verrassing.** Eén station van 550 kW met twee laadpunten van 275 kW geeft
**€3.520 méér subsidie dan het huidige plan** en heeft tegelijk **minder totale stroom**
(~835 A tegen ~910 A) — dus minder koper, één sleuf, één fundatie, één set schakelmateriaal
in plaats van twee. Operationeel krijg je vrijwel wat je wilde: twee laadpunten van 275 kW in
plaats van 300 kW.

Nadeel van C: **geen redundantie.** Valt dat ene station uit, dan kan geen enkele truck
laden. Bij twee losse stations kun je door op één. Weeg dat mee — voor een bedrijf dat
dagelijks moet rijden is dat een reëel risico.

**Optie D levert absoluut het meeste** (€22.400), maar heeft de zwaarste totale bekabeling en
is precies waar Draccu op wijst.

### Het break-evenpunt dat je aan Draccu moet vragen

Voor optie D ten opzichte van het huidige plan gaat het om **€8.320 extra subsidie**, oftewel
**€4.160 per station**.

> **Vraag Draccu en de laadpaalleverancier één getal: wat is de totale meerprijs van 2× 350 kW
> ten opzichte van 2× 300 kW — station, kabel, trafo en arbeid bij elkaar?**
>
> Blijft die onder **€8.320**, dan is optie D de beste keuze.
> Komt die erboven, dan is optie C (€17.600, één run) vrijwel zeker de winnaar.

⚠️ **Belangrijk:** zwaardere kabels **verhogen je subsidie niet**. Het vaste bedrag per
categorie is bedoeld om het hele pakket te dekken — laadstations, hoofdaansluiting én
bekabeling samen. Extra koper is dus zuivere kostenpost. (Eén klein voordeel: het verhoogt
wel je subsidiabele kosten, wat helpt om onder het 40%-plafond te blijven — zie §4.)

### Drie manieren om de zwaardere bekabeling betaalbaar te maken

Als optie D op de kabels sneuvelt, zijn dit de knoppen — in volgorde van effect:

1. **DC-koppeling met de accu.** Vraag Draccu of de accu **DC-gekoppeld** kan worden aan de
   laadstations in plaats van via de AC-zijde. Staat de accu op dezelfde DC-bus, dan levert
   hij het piekvermogen lokaal en hoeft de AC-voeding alleen het *gemiddelde* te dragen, niet
   de piek. Dat kan de zware bekabeling grotendeels wegnemen. Dit is de grootste knop die je
   hebt, het is Draccu's eigen vakgebied, én het helpt direct bij de 70%-eis (§3).
2. **Trafo of verdeelkast naast het laadeiland.** Kabelkosten schalen met lengte × doorsnede.
   Verplaats het voedingspunt naar het laadeiland, dan is de zware run 15 meter in plaats van
   150. Vaak halveert dat de meerprijs of meer.
3. **Aluminium in plaats van koper** voor de lange runs — goedkoper per ampère, wel een
   grotere doorsnede.

Een vierde mogelijkheid: de categorie hangt af van het **geïnstalleerde vermogen van het
station**, niet van wat je gelijktijdig afneemt. Laadpleinen begrenzen de gelijktijdigheid
standaard via het EMS, en dat is precies waar de accu voor is. Laat je adviseur of RVO
bevestigen dat een EMS-begrenzing de indeling niet raakt vóór je hierop bouwt.

### Aanbeveling

1. **Vraag de meerprijs van 350 kW op.** Onder €8.320 → **optie D, € 22.400**.
2. **Is die te hoog → optie C, één station 550 kW met 2× 275 kW, € 17.600.** Meer subsidie
   dan het huidige plan, minder koper, één sleuf. Alleen afvallen als je de redundantie van
   twee losse stations echt nodig hebt.
3. **In dat laatste geval → optie A, 2× 220 kW, € 14.080.** Zelfde subsidie als het huidige
   plan, maar duidelijk lichtere kabels en goedkopere stations. Voor nachtladen op de
   vestiging is 220 kW ruim voldoende: een truckaccu van 400 kWh is in minder dan twee uur
   vol.
4. **Blijf in geen geval op 2× 300 kW staan.**

⚠️ **Let op hoe het vermogen wordt vastgesteld:** de categorie volgt uit het **totaalvermogen
van het laadstation**, niet uit het vermogen per laadpunt. Laat de leverancier het
totaalvermogen expliciet op de offerte zetten — dit is de meest gemaakte fout in deze
aanvragen en hij kost direct een categorie.

**Totaalbedragen inclusief de accu van €85.000:** optie A € 99.080 · optie B € 99.080 ·
optie C **€ 102.600** · optie D **€ 107.400**.

Nog een grens om te kennen: je kunt maximaal **€350.000 subsidie per aanvrager per jaar**
ontvangen, batterijen niet meegerekend. Daar zit je met deze aanvraag ruim onder.

---

## 3. De 70%-eis — hier kan €85.000 op stranden

Een stationaire batterij is alleen subsidiabel als hij **aantoonbaar functioneel gekoppeld
is aan de laadinfrastructuur**:

> **Minimaal 70% van het aantal kWh dat uit de stationaire batterij wordt ontladen, moet
> aantoonbaar naar de laadstations gaan.**

Bij 1.000 kWh — het maximum — wordt dit een serieus ontwerpvraagstuk, want de accu is groot
ten opzichte van wat twee vrachtwagens per dag afnemen.

**Reken mee.** Cycle je de accu één keer per dag volledig, dan ontlaad je 1.000 kWh en moet
er dus **minstens 700 kWh per dag naar de laadpalen**. Dat is ongeveer twee volle
truckladingen per dag, elke dag. Haal je dat niet, dan zijn er maar twee uitkomsten:

- **je gebruikt het restant voor de kwekerij** — klimaat, belichting, koeling — en dan zak je
  onder de 70% en voldoe je niet meer aan de voorwaarde; of
- **je laat de accu grotendeels stilstaan** — dan haal je de 70% wel, maar staat er een accu
  van €300.000 niets te doen.

**Je kunt dus niet allebei hebben.** Dit is precies het spanningsveld met Draccu's
standaardopzet (overdag zonnestroom opslaan, 's avonds het bedrijf voeden, 15–20 ct/kWh
besparing). Dat verdienmodel is hier grotendeels niet toegestaan zolang de subsidie loopt.

**Wat je moet checken vóór je dit indient:**

- Hoeveel kWh nemen de vrachtwagens werkelijk per dag af? Reken met circa 1,1–1,4 kWh per
  gereden kilometer. Kom je structureel onder de ~700 kWh/dag, **overweeg dan een kleinere
  accu** — bijvoorbeeld 600 kWh (indicatief €51.000). Minder subsidie, maar wel een aanvraag
  die de controle overleeft.
- Hoe lang loopt de verplichting? De instandhoudingstermijn is **24 maanden**, dus je moet
  twee jaar lang aan de 70% voldoen — niet alleen in het eerste kwartaal.
- Kan het energiemanagementsysteem de laadstations **prioriteren** én de ontlaadstromen **per
  bestemming meten en loggen**? Zonder die logging kun je niets aantonen.

Laat Draccu deze drie punten **schriftelijk bevestigen in de offerte**. Dat document gaat als
bijlage mee.

### Nog een technische check: kan de accu 600 kW leveren?

Twee laadpalen van 300 kW vragen samen **600 kW** als ze gelijktijdig vol draaien. Een accu
van 1.000 kWh heeft niet automatisch 600 kW afgifte — veel systemen in die klasse leveren
250 tot 500 kW. Vraag Draccu expliciet naar het **ontlaadvermogen in kW**, niet alleen de
capaciteit in kWh. Levert de accu maar 300 kW, dan kun je nooit twee palen tegelijk vol
bedienen uit de accu en moet het net bijspringen — precies wat je wilde vermijden.

---

## 4. Voorwaarden SPRILA — de harde eisen

| Onderwerp | Eis |
|---|---|
| **Aanvraagperiode 2026** | 20 januari 09:00 t/m **18 december 2026 12:00** |
| **Verdeling** | Op **volgorde van binnenkomst** — vol is vol |
| **Beslistermijn** | Binnen **13 weken** |
| **Inloggen** | **eHerkenning niveau 3 (eH3)** minimaal, via Mijn RVO |
| **Locatie** | Laadinfrastructuur in Nederland, op eigen of gehuurd terrein |
| **Instandhouding** | Laadstations én accu minimaal **24 maanden actief in gebruik** |
| **Niet openbaar** | In die 24 maanden **niet openbaar toegankelijk** maken |
| **Minimum per locatie** | Subsidiebedrag ten minste circa **€2.500** per laadlocatie |
| **Minimum accu** | Subsidie voor een accu bedraagt **minimaal €25.000** |
| **Maximum accu** | **1.000 kWh per laadlocatie** |
| **Accu-eis** | ≥ **70%** van ontladen kWh moet naar de laadstations |
| **Staatssteunplafond** | Max **40%** van de subsidiabele kosten voor mkb, **20%** voor grote bedrijven |
| **Minimale infrastructuur** | Ten minste 1 DC-laadstation vanaf 20 kW of 1 AC-laadstation vanaf 11 kW |

### De 40%-toets — haal je die?

De subsidie mag nooit meer zijn dan 40% van de subsidiabele kosten (mkb). Je hebt dus
minimaal 2,5× het subsidiebedrag aan subsidiabele kosten nodig: **€247.700** bij optie A/B,
**€256.500** bij optie C en **€268.500** bij optie D.

Dat haal je vrijwel zeker: een accu van 1.000 kWh kost installatieklaar al snel €250.000 tot
€400.000, en daar komen twee DC-stations, aansluitwerk en civiel werk bovenop. **Maar reken
het na** zodra de offertes er zijn, want als je eronder zakt wordt de subsidie naar beneden
bijgesteld.

### Subsidiabele kosten

Ruimer dan alleen de laadpaal en de accu. Subsidiabel is alles wat nodig is om de
laadinfrastructuur te bouwen, installeren, verbeteren en uit te breiden:

- de laadstations, de accu en bijbehorende technische apparatuur;
- elektrotechnische installatie en verbetering: **voedingskabels, transformatoren**,
  netaansluiting, aansluiting op elektriciteitsopslag;
- **civieltechnisch werk**: grondwerk, terrein- en wegaanpassingen, bestrating;
- **installatiekosten** en **vergunningskosten**.

Neem dit allemaal mee — het helpt je bovendien ruim boven de 40%-drempel te blijven.

### Mkb of groot bedrijf

Dit bepaalt of je 40% of 20% mag ontvangen, én of je het hoge of lage bedrag krijgt (grofweg
factor 2 — bij deze aanvraag een verschil van tienduizenden euro's). Kwekerij Baas is naar
verwachting **mkb**, maar de Europese mkb-toets kijkt óók naar verbonden en
partnerondernemingen: hangen er holdings of deelnemingen boven of naast de kwekerij, dan tel
je die mee. Loop dit na vóór indiening — een onjuiste mkb-verklaring is een
terugvorderingsgrond.

---

## 5. Het tekenverbod — de valkuil die €99.080 kost

Er zijn twee aanvraagroutes, met een omslagpunt bij €25.000 subsidie. Met €99.080 zit je
ruim in de zware route:

**€25.000 of meer → reguliere staatssteunregels**

Je moet aanvragen **vóórdat je opdracht geeft** voor de aanleg. Dit is de eis van het
zogeheten stimulerend effect: subsidie mag alleen investeringen uitlokken die anders niet
zouden plaatsvinden. Teken je eerst het contract met Draccu of de laadpaalleverancier en
vraag je daarna aan, dan is je aanvraag **niet meer te redden** — geen coulance, geen
uitzondering, geen herstelmogelijkheid.

👉 **Concreet: geen opdracht tekenen, geen aanbetaling doen, geen bestelling plaatsen totdat
de SPRILA-aanvraag is ingediend.** Offertes opvragen mag wel — sterker nog, die heb je nodig
als bijlage. Maar de handtekening onder de opdracht komt ná de indiening.

Dit is een omslag ten opzichte van de eerder besproken minimale variant: daar mocht je eerst
installeren en achteraf aanvragen. Die vrijheid heb je nu niet meer.

**Als er al iets besteld of getekend is: meld het direct, dan kijken we wat er nog wel kan.**
Soms is er nog iets te redden door de opdracht te ontbinden of te splitsen, maar dan moet het
nu gebeuren.

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
| Aanvraagroute | **≥ €25.000 → staatssteun, indienen vóór opdrachtverlening** |
| SBI-code | `[SBI-code, tuinbouw]` |
| IBAN | `[IBAN t.n.v. de aanvragende rechtspersoon]` |

### 6.2 Op te geven laadinfrastructuur

In te vullen zodra de configuratiekeuze uit §2 vaststaat:

| Optie | Opgave | Categorie | Aantal | Indicatief bedrag |
|---|---|---|---|---|
| A | DC 220 kW | vanaf 220 kW | 2 | € 14.080 |
| B | DC 300 kW *(niet doen — §2)* | vanaf 220 kW | 2 | € 14.080 |
| C | DC 550 kW, 2× 275 kW laadpunten | vanaf 550 kW | 1 | € 17.600 |
| D | DC 350 kW | vanaf 350 kW | 2 | € 22.400 |

`[Gekozen optie: …]`

**Stationaire accu**

| Veld | In te vullen |
|---|---|
| Opslagcapaciteit | **1.000 kWh** (maximum per laadlocatie) |
| Ontlaadvermogen | `[… kW — opvragen bij Draccu, zie §3]` |
| Aandeel ontlading naar laadstations | ≥ 70%, contractueel vast te leggen |
| Wijze van aantonen | EMS met prioritering van de laadstations en logging van ontlaadstromen per bestemming |
| Indicatief bedrag | 1.000 kWh × € 85 = **€ 85.000** |

**Begroting subsidiabele kosten**

| Kostenpost | Bedrag excl. btw |
|---|---|
| Stationaire accu 1.000 kWh | `[…]` |
| DC-laadstations `[gekozen optie]` | `[…]` |
| Netaansluiting / verzwaring | `[…]` |
| Voedingskabels, trafo, schakelmateriaal | `[…]` |
| Energiemanagementsysteem | `[…]` |
| Civiel werk (grondwerk, bestrating, fundatie) | `[…]` |
| Installatiekosten | `[…]` |
| Vergunningen | `[…]` |
| **Totaal subsidiabele kosten** | `[…]` — **moet ≥ 2,5× de gevraagde subsidie zijn** |
| **Gevraagde subsidie** | `[€ 99.080 / € 102.600 / € 107.400]` |

### 6.3 Projectomschrijving (concepttekst — aan te vullen en over te nemen)

> Kwekerij Baas verduurzaamt het eigen transport door over te stappen op elektrische
> vrachtwagens voor de aan- en afvoer van `[producten/stromen]`. Om die overstap mogelijk te
> maken, realiseren wij op ons eigen terrein aan `[adres]` een private laadvoorziening,
> uitsluitend bestemd voor ons eigen wagenpark. De laadvoorziening wordt niet openbaar
> toegankelijk gemaakt.
>
> **Wagenpark.** Wij zetten `[aantal]` elektrische vrachtwagens in `[categorie N2/N3]`, met
> een gemiddelde dagelijkse energiebehoefte van circa `[… kWh]` per voertuig, samen circa
> `[… kWh]` per dag. De voertuigen keren dagelijks terug naar de vestiging en laden
> overwegend `[’s nachts / tussen ritten]`.
>
> **Laadinfrastructuur.** Wij plaatsen `[aantal en vermogen conform de gekozen optie uit §2,
> bijv. "één DC-laadstation van 550 kW met twee laadpunten van 275 kW" of "twee
> DC-laadstations van elk 350 kW"]`, samen `[… ]` kW, aangevuld met de benodigde
> elektrotechnische en civiele werken.
>
> **Netcapaciteit als knelpunt.** De beschikbare netcapaciteit op onze aansluiting bedraagt
> `[… kVA]`. Gelijktijdig laden op vol vermogen vraagt `[…]` kW en overschrijdt daarmee de
> beschikbare capaciteit. Netverzwaring is `[niet op
> afzienbare termijn beschikbaar / kostbaar en pas mogelijk in …]`. Zonder aanvullende
> maatregelen is elektrificatie van het wagenpark op deze locatie daarom niet realiseerbaar.
>
> **Stationaire accu als oplossing.** Wij realiseren daarom een stationaire accu van
> 1.000 kWh met een ontlaadvermogen van `[… kW]`, functioneel gekoppeld aan de
> laadinfrastructuur. De accu laadt op momenten dat de vraag laag is en de opwek uit onze
> zonnepanelen hoog, en levert tijdens laadpieken het vermogen dat de netaansluiting niet kan
> leveren. Zo verhogen wij de laadcapaciteit binnen de bestaande aansluiting, zonder
> netverzwaring. De accu wordt aangestuurd door een energiemanagementsysteem dat de
> laadstations te allen tijde prioriteert; ten minste 70% van de uit de accu ontladen energie
> gaat naar de laadstations, en dit wordt per bestemming gemeten en gelogd. `[Onderbouwing
> met verwachte dagelijkse kWh naar de laadstations: … kWh/dag op … kWh ontlading.]`
>
> **Eigen opwek.** Op de daken van `[gebouwen]` realiseren wij `[… kWp]` aan zonnepanelen
> (separaat gefinancierd, buiten deze aanvraag). De combinatie van eigen opwek, buffering in
> de accu en slim laden zorgt ervoor dat de vrachtwagens grotendeels op eigen duurzaam
> opgewekte stroom rijden en dat de piekbelasting op het net beperkt blijft.
>
> **Planning.** Aanvraag `[maand]`, opdrachtverlening ná subsidieverlening, realisatie
> `[maand]` tot `[maand]`, ingebruikname `[maand]`. De laadinfrastructuur en de accu blijven
> ten minste 24 maanden na ingebruikname actief in gebruik.
>
> **Noodzaak van de subsidie.** Zonder subsidie is de businesscase niet sluitend: `[korte
> onderbouwing — meerkosten t.o.v. diesel, terugverdientijd, geen alternatief zonder
> netverzwaring]`. De subsidie is daarmee bepalend voor de beslissing om deze investering nu
> te doen.

---

## 7. Bijlagenchecklist

- [ ] **Offertes** voor accu, laadstations en aanleg — gespecificeerd per kostenpost, excl.
      btw, **niet ondertekend als opdracht**
- [ ] **Technische specificatie laadstations** — met expliciet het **totaalvermogen per
      station** en het aantal laadpunten
- [ ] **Technische specificatie accu** — capaciteit in kWh, **ontlaadvermogen in kW**, en de
      beschrijving hoe de 70%-eis wordt geborgd en gemeten
- [ ] **Schriftelijke bevestiging van Draccu** dat het EMS de laadstations prioriteert en de
      ontlaadstromen per bestemming logt
- [ ] **Onderbouwing van de 70%-eis** — verwachte kWh/dag naar de laadstations, afgezet tegen
      de verwachte ontlading van de accu
- [ ] **Situatietekening / plattegrond** van de laadlocatie
- [ ] **Begroting** van alle subsidiabele kosten, met de 40%-toets erin
- [ ] **Mkb-verklaring** (inclusief verbonden en partnerondernemingen)
- [ ] **Staatssteunverklaring**
- [ ] **Bewijs van eigendom of huurovereenkomst** van het terrein; bij huur: schriftelijke
      toestemming van de verhuurder
- [ ] **Machtiging** als een intermediair namens jullie indient

Voor de twee andere regelingen:

- [ ] AanZET: koopovereenkomst of financial-leasecontract van de trucks
- [ ] SDE++: **transportindicatie van de netbeheerder**

---

## 8. Stappenplan met data

| Wanneer | Wat | Waarom nu |
|---|---|---|
| **Nu** | **Niets tekenen bij Draccu of de laadpaalleverancier** | Tekenverbod tot indiening — €99.080 op het spel |
| **Deze week** | eHerkenning niveau 3 controleren of aanvragen | Zonder eH3 kun je niet indienen; kost dagen |
| **Deze week** | Mkb-toets uitvoeren (incl. verbonden ondernemingen) | Bepaalt 40% vs 20% en de bedragen |
| **Deze week** | Transportindicatie aanvragen bij de netbeheerder | Lange doorlooptijd; blokkeert SDE++ in november |
| **Deze week** | **Meerprijs 2× 350 kW t.o.v. 2× 300 kW opvragen** (station + kabel + trafo + arbeid) | Break-even ligt op € 8.320 — bepaalt de configuratie |
| **Deze week** | Draccu vragen of de accu **DC-gekoppeld** kan worden aan de laadstations | Grootste knop om de zware bekabeling te vermijden |
| **Deze week** | Offerte opvragen voor **1× 550 kW met 2× 275 kW** (optie C) | € 3.520 meer dan het huidige plan, één kabelrun |
| **Aug** | Dagelijkse kWh-behoefte van het wagenpark doorrekenen | Bepaalt of 1.000 kWh de 70%-eis haalt |
| **Aug** | Offertes opvragen — accu, laadstations, aansluit- en civiel werk | Bijlage bij de aanvraag |
| **Aug** | Ontlaadvermogen accu opvragen bij Draccu | Moet 600–700 kW aankunnen |
| **Aug** | Bedragen verifiëren met de RVO-rekentool | Bedragen hier zijn indicatief |
| **Aug/sep** | **SPRILA indienen** | Volgorde van binnenkomst; niet wachten tot december |
| **29 sep – 16 okt** | **AanZET indienen** voor de trucks | Kort venster, gaat snel vol — dag één indienen |
| **27 okt – 26 nov** | **SDE++ indienen** voor de zonnepanelen | Enige ronde in 2026 |
| **Na toekenning** | Pas dán opdracht geven en realiseren | |
| **Na realisatie** | Vaststelling aanvragen; 24 maanden in gebruik houden, 70%-eis blijven halen | Instandhoudingsverplichting |

---

## 9. To-dolijst

### Nu regelen — dit blokkeert de rest

- [ ] **Niets tekenen.** Geen opdracht, geen aanbetaling, geen bestelling tot de aanvraag
      is ingediend. Als er al iets getekend is: direct melden.
- [ ] **eHerkenning niveau 3 (eH3)** controleren of aanvragen.
- [ ] **Mkb-toets** doen, inclusief holdings, deelnemingen en verbonden ondernemingen.
- [ ] **Transportindicatie** aanvragen bij de netbeheerder (Liander/Stedin) — nodig voor
      SDE++ in november, lange doorlooptijd.

### Techniek en offertes

- [ ] **Meerprijs van 2× 350 kW opvragen** ten opzichte van 2× 300 kW — station, kabel, trafo
      en arbeid bij elkaar. Onder €8.320 → doen. Erboven → optie C.
- [ ] **Offerte opvragen voor optie C**: één station van 550 kW met 2× 275 kW laadpunten.
      €3.520 meer subsidie dan het huidige plan, met minder koper en één sleuf.
- [ ] **Draccu vragen of de accu DC-gekoppeld kan worden** aan de laadstations. Zo ja, dan
      hoeft de AC-voeding alleen het gemiddelde te dragen en verdwijnt het kabelprobleem
      grotendeels.
- [ ] **Voedingspunt / trafo zo dicht mogelijk bij het laadeiland plannen** — kabelkosten
      schalen met lengte × doorsnede.
- [ ] **Niet op 2× 300 kW blijven staan.** Dat is de enige optie die geld kost zonder iets op
      te leveren.
- [ ] **Totaalvermogen per station op de offerte laten zetten** — niet het vermogen per
      laadpunt. Dit bepaalt de categorie.
- [ ] **Ontlaadvermogen van de accu opvragen bij Draccu** (in kW). Twee palen vragen samen
      600–700 kW; veel accu's in deze klasse leveren minder.
- [ ] **Draccu laten bevestigen** dat het EMS de laadstations prioriteert en ontlaadstromen
      per bestemming meet en logt — schriftelijk, in de offerte.
- [ ] **Dagelijkse kWh-behoefte van het wagenpark doorrekenen.** Kom je structureel onder
      ~700 kWh/dag naar de trucks, overweeg dan een kleinere accu (§3).
- [ ] **Offertes verzamelen** voor accu, laadstations, aansluitwerk en civiel werk,
      gespecificeerd per kostenpost.
- [ ] **40%-toets narekenen**: totale subsidiabele kosten moeten ≥ €247.700 zijn.
- [ ] **Bedragen verifiëren** met de RVO-rekentool (`rvo.nl/form/sprila-rekentool`).

### Indienen en daarna

- [ ] **SPRILA indienen** via Mijn RVO — bij voorkeur in augustus/september, sowieso vóór
      18 december 2026, 12:00.
- [ ] **Pas ná subsidieverlening opdracht geven.**
- [ ] **24 maanden in gebruik houden**, niet openbaar toegankelijk maken, en de 70%-eis
      blijvend halen.

### Losse deadlines dit najaar

- [ ] **29 sep – 16 okt:** AanZET indienen voor de trucks. Kort venster — dag één indienen.
- [ ] **27 okt – 26 nov:** SDE++ indienen voor de zonnepanelen. Enige ronde in 2026.

### Gegevens die ik nog van je nodig heb

Hiermee maak ik de aanvraagtekst af in plaats van hem te schetsen:

1. Statutaire naam, KVK-nummer, SBI-code, adres laadlocatie, eigendom of huur.
2. Uitkomst van de mkb-toets.
3. Aantal en type vrachtwagens, accucapaciteit per truck, kWh per dag.
4. Laadprofiel: 's nachts, tussen ritten, of beide — en hoeveel gelijktijdig.
5. Huidige netaansluiting in kVA en wat de netbeheerder over verzwaring zegt.
6. De offertes zodra ze er zijn.
7. Of je de accu ook voor de kwekerij zelf wilt inzetten — cruciaal voor de 70%-eis.
8. **Wat je precies bedoelt met "accu laden en legen op vrachtwagens"**: de stationaire accu
   die de trucks laadt, of de accu's van de trucks zelf als buffer (V2G)? Dit staat nog open.
9. Vermogen van de zonnepanelen in kWp.

---

## 10. Waarschuwing bij de cijfers

**rvo.nl was in deze werksessie niet bereikbaar** — het netwerkbeleid van deze omgeving
blokkeert het domein (403 op de proxy). De regelingsystematiek, termijnen en voorwaarden
hierboven zijn opgebouwd uit zoekresultaten en secundaire bronnen (adviesbureaus,
brancheorganisaties, Ondernemersplein).

Dat betekent concreet:

- De **structuur, voorwaarden en termijnen** zijn consistent over meerdere onafhankelijke
  bronnen en betrouwbaar genoeg om op te plannen.
- De **exacte subsidiebedragen per categorie** zijn **niet op de bron geverifieerd**. Dat
  raakt de hele optimalisatie in §2 — zowel de totalen als de rangorde tussen de opties.
  Reken alle vier de opties na met de RVO-rekentool voordat je kiest.
- Het patroon van **exact €32 per kW op elke categoriegrens** volgt uit de gevonden bedragen
  en is een sterke aanwijzing dat de tabel klopt, maar het is een afleiding van mijn kant, geen
  bevestigde regel uit de regelingstekst. Toets hem met de rekentool.
- De categorie **"DC ≥ 550 kW óf 2 × 275 kW"** is in meerdere bronnen bevestigd, inclusief de
  connector-onafhankelijkheid (CCS én MCS). Optie C staat of valt hiermee — verifieer hem als
  eerste.
- Pas op bij het googelen: er circuleren ook bedragen van **€19.000, €43.000 en €80.000** per
  laadstation. Dat zijn **SPULA**-bedragen (publieke laadinfrastructuur zwaar vervoer), niet
  SPRILA. Verwar ze niet.
- Het **maximum van 1.000 kWh per laadlocatie** en de **minimumsubsidie van €25.000** voor
  accu's zijn in meerdere bronnen bevestigd. De eerder gevonden 1.400 kWh bleek een
  SPULA-grens, niet SPRILA.
- Verifieer vóór indiening in elk geval: de bedragentabel, de categoriegrenzen, de
  accugrenzen en de precieze bijlagenlijst. Gebruik daarvoor:
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
- [SPRILA-subsidie voor de aanschaf van een batterij — ELIX](https://www.elix.nl/sprila-subsidie-voor-een-batterij/)
- [Met SPRILA en SPULA krijg je subsidie voor laadinfra — Techniek Nederland](https://www.technieknederland.nl/nieuws/met-sprila-en-spula-krijg-je-subsidie-voor-laadinfra)
- [Wijzigingen en openstelling SPriLa, SPuLa en STour in 2026 — EIFFEL Subsidies](https://eiffelsubsidies.nl/update/wijzigingen-en-openstelling-subsidieregelingen-sprila-spula-en-stour-in-2026/)
- [De SPRILA-subsidie in 2026: alle wijzigingen op een rij — Moore MKW](https://moore-mkw.nl/actueel/belangrijke-wijzigingen-in-sprila-2026)
- [SDE++-subsidie opent 22 september 2026 met € 8 miljard budget — Moore MKW](https://moore-mkw.nl/actueel/sde-2026-openstelling)
- [SDE++ 2026 in september open met 8 miljard euro budget — Solar & Storage Magazine](https://solarmagazine.nl/nieuws-zonne-energie/i42972/sde-2026-in-september-open-met-8-miljard-euro-budget-nieuwe-categorie-zonnepanelen-langs-infra)
- [Draccu](https://draccu.nl/) — beoogd leverancier accu
- [Draccu levert accu op zonnestroom aan bedrijven — Rabo & Co](https://raboenco.rabobank.nl/nl/articles/101580/)

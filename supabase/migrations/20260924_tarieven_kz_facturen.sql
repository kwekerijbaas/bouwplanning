-- Tarieven aangevuld uit de KZ-facturen 2026200 (wk 26+27 Enserweg), 2026221 (wk 30 Enserweg)
-- en 2026222 (wk 30 Drietorensweg).
-- Alleen toevoegen wat nog ontbreekt; bestaande tarieven blijven ongemoeid (idempotent).
--
-- Bewust NIET aangepast: Transport container (95), Transport materiaal (95) en Ophalen materiaal (130).
-- KZ rekent die niet consequent: Ophalen staat in wk 30 en 34 op 95 maar in wk 35 op 130, Transport
-- container in wk 29 en 30 op 130 maar in wk 35 op 95, Transport materiaal in wk 26/27 op 95 en 115.
-- Het kantoor past de prijs per regel aan tot duidelijk is waar het van afhangt.
insert into wb_tarief (categorie, omschrijving, eenheid_n, eenheid_per, eenheid_totaal, prijs, dagtype, sort, actief)
select v.categorie, v.omschrijving, v.eenheid_n, v.eenheid_per, v.eenheid_totaal, v.prijs, 'alle', v.sort, true
from (values
  ('materieel','Gebruik trekker met kipper incl. brandstof','','','per dag',200.00,38),
  ('materieel','Gebruik gootkarren A-type','stuks','dag','per dag',80.00,39),
  ('transport','Transport machines','','','per uur',115.00,44),
  ('materiaal','Gootstrip','','','per stuk',4.38,57),
  ('materiaal','Nokbeveiliging','','','per stuk',6.25,58),
  ('materiaal','Dekroede','','','per stuk',15.65,59),
  ('materiaal','Kaproede','','','per stuk',18.75,60),
  ('materiaal','Goot-nok-goot kabel recht','','','per stuk',28.13,61),
  ('materiaal','Goot-nok-goot kabel schuin','','','per stuk',28.13,62),
  ('materiaal','Nok koppeling','','','per stuk',6.25,63),
  ('materiaal','Nokprofiel','','','per stuk',6.25,64),
  ('materiaal','Nokblok + parkers','','','per stuk',9.38,65),
  ('materiaal','Nokblok inclusief parkers','','','per stuk',4.38,66),
  ('materiaal','Parkers','','','per stuk',0.32,67),
  ('materiaal','Gootlepels + ring + parkers','','','per stuk',3.13,68),
  ('materiaal','Luchtramen compleet','','','per stuk',143.25,69),
  ('materiaal','Betonplex','','','per stuk',6.00,70)
) as v(categorie, omschrijving, eenheid_n, eenheid_per, eenheid_totaal, prijs, sort)
where not exists (select 1 from wb_tarief t where t.categorie = v.categorie and lower(t.omschrijving) = lower(v.omschrijving));

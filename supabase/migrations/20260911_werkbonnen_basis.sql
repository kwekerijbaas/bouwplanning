-- Werkbonnen: dagbonnen werkvloer -> beoordeling administratie -> weekoverzicht -> factuur (UBL/CSV)
-- Toegepast op Supabase-project hlgvtxcwbhrbbcozvsen op 11-09-2026 (migration "werkbonnen_basis").
create table if not exists wb_bedrijf (
  id serial primary key,
  soort text not null default 'aannemer' check (soort in ('aannemer','opdrachtgever')),
  naam text not null,
  adres text not null default '',
  postcode_plaats text not null default '',
  land text not null default 'NL',
  kvk text not null default '',
  btw_nummer text not null default '',
  iban text not null default '',
  email text not null default '',
  telefoon text not null default '',
  debiteur_code text not null default '',
  actief boolean not null default true,
  created_at timestamptz not null default now(),
  unique (soort, naam)
);
create table if not exists wb_project (
  id serial primary key,
  code text not null unique,
  naam text not null,
  adres text not null default '',
  postcode_plaats text not null default '',
  aannemer_id integer references wb_bedrijf(id),
  opdrachtgever_id integer references wb_bedrijf(id),
  claimnummer text not null default '',
  factuur_omschrijving text not null default '',
  actief boolean not null default true,
  sort integer not null default 100,
  created_at timestamptz not null default now()
);
create table if not exists wb_tarief (
  id serial primary key,
  categorie text not null check (categorie in ('arbeid','km','overnachting','materieel','transport','materiaal')),
  omschrijving text not null,
  eenheid_n text not null default '',
  eenheid_per text not null default '',
  eenheid_totaal text not null default '',
  prijs numeric(10,2) not null default 0,
  dagtype text not null default 'alle' check (dagtype in ('alle','ma-vr','za','zo')),
  sort integer not null default 100,
  actief boolean not null default true,
  unique (categorie, omschrijving)
);
create table if not exists wb_bon (
  id serial primary key,
  project_id integer not null references wb_project(id),
  datum date not null,
  ingevuld_door text not null default '',
  status text not null default 'concept' check (status in ('concept','ingediend','goedgekeurd','afgekeurd','gefactureerd')),
  opmerking text not null default '',
  afgetekend_door text not null default '',
  handtekening_pad text not null default '',
  foto_paden jsonb not null default '[]'::jsonb,
  ingediend_ts timestamptz,
  beoordeeld_door text not null default '',
  beoordeeld_ts timestamptz,
  beoordeling text not null default '',
  factuur_id integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists wb_bon_project_datum on wb_bon(project_id, datum);
create table if not exists wb_bonregel (
  id serial primary key,
  bon_id integer not null references wb_bon(id) on delete cascade,
  sort integer not null default 0,
  categorie text not null check (categorie in ('arbeid','km','overnachting','materieel','transport','materiaal')),
  omschrijving text not null,
  tarief_id integer references wb_tarief(id) on delete set null,
  aantal numeric(10,2) not null default 0,
  per numeric(10,2),
  totaal numeric(12,2) not null default 0,
  prijs numeric(10,2) not null default 0,
  bedrag numeric(12,2) not null default 0,
  eenheid_n text not null default '',
  eenheid_per text not null default '',
  eenheid_totaal text not null default '',
  namen text not null default ''
);
create index if not exists wb_bonregel_bon on wb_bonregel(bon_id);
create table if not exists wb_factuur (
  id serial primary key,
  nummer text not null unique,
  project_id integer not null references wb_project(id),
  jaar integer not null,
  week integer not null,
  datum date not null default current_date,
  vervaldatum date,
  omschrijving text not null default '',
  regel_omschrijving text not null default 'Uitgevoerde werkzaamheden volgens overzicht',
  bedrag_excl numeric(12,2) not null default 0,
  btw_pct numeric(5,2) not null default 21,
  btw_bedrag numeric(12,2) not null default 0,
  bedrag_incl numeric(12,2) not null default 0,
  status text not null default 'concept' check (status in ('concept','definitief','geexporteerd')),
  aangemaakt_door text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table wb_bon add constraint wb_bon_factuur_fk foreign key (factuur_id) references wb_factuur(id) on delete set null;
create table if not exists wb_instelling (sleutel text primary key, waarde text not null default '');
create table if not exists wb_logboek (id serial primary key, ts timestamptz not null default now(), wie text not null default '', actie text not null);
alter table wb_bedrijf enable row level security;
alter table wb_project enable row level security;
alter table wb_tarief enable row level security;
alter table wb_bon enable row level security;
alter table wb_bonregel enable row level security;
alter table wb_factuur enable row level security;
alter table wb_instelling enable row level security;
alter table wb_logboek enable row level security;
-- Stamgegevens: zie supabase/seed_werkbonnen.sql (KZ Kasherstel-tarieven uit facturen week 33-35).

-- 12-09-2026 (migration "werkbonnen_huisstijl"): huisstijl van de aannemer (logo, kleuren, website)
alter table wb_bedrijf add column if not exists logo_pad text not null default '';
alter table wb_bedrijf add column if not exists kleur text not null default '';
alter table wb_bedrijf add column if not exists kleur2 text not null default '';
alter table wb_bedrijf add column if not exists website text not null default '';

-- 12-09-2026 (migration "werkbonnen_dagbon2"): dagbon als shifts + namenwolk + voertuigen, projectafspraken, medewerkers
create table if not exists wb_medewerker (
  id serial primary key,
  naam text not null unique,
  functie text not null default '',
  actief boolean not null default true,
  sort integer not null default 100,
  created_at timestamptz not null default now()
);
create table if not exists wb_voertuig (
  id serial primary key,
  naam text not null unique,
  soort text not null default 'auto' check (soort in ('auto','materieel')),
  kenteken text not null default '',
  tarief_id integer references wb_tarief(id) on delete set null,   -- materieel: dagtarief; auto: (leeg) km-vergoeding
  actief boolean not null default true,
  sort integer not null default 100
);
-- Projectafspraken: per project een eigen prijs per tarief (wizard bij aanmaken project; ± 0,25-stappen).
create table if not exists wb_projecttarief (
  id serial primary key,
  project_id integer not null references wb_project(id) on delete cascade,
  tarief_id integer not null references wb_tarief(id) on delete cascade,
  prijs numeric(10,2) not null default 0,
  unique (project_id, tarief_id)
);
alter table wb_project add column if not exists afstand_km numeric(8,1) not null default 0;      -- standaard km naar de locatie (enkele reis x2 = heen en terug wordt op de bon gekozen)
alter table wb_project add column if not exists aangemaakt_door text not null default '';
alter table wb_bon add column if not exists invoer jsonb not null default '{}'::jsonb;              -- shifts + voertuigen zoals aangetikt (bron van de afgeleide regels)
alter table wb_bonregel add column if not exists bron text not null default '';                    -- '' / 'shift' / 'voertuig' (afgeleid) of 'extra' (handmatig)
alter table wb_medewerker enable row level security;
alter table wb_voertuig enable row level security;
alter table wb_projecttarief enable row level security;

-- 12-09-2026 (migration "werkbonnen_medewerker_controle"): namen van de werkvloer eerst controleren door de projectleider
alter table wb_medewerker add column if not exists gecontroleerd boolean not null default true;   -- false = nieuw aangemaakt op de werkvloer, nog te controleren/corrigeren
alter table wb_medewerker add column if not exists bron text not null default '';                 -- 'werkvloer' / 'kantoor' / 'urenbriefje week 31'
alter table wb_medewerker add column if not exists aangemaakt_door text not null default '';

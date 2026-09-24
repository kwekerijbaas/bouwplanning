-- Prijzen op dagbonnen verwijzen naar het tarief of de projectprijs (projectafspraken).
-- Na een prijswijziging zet deze functie de prijs en het bedrag opnieuw op alle regels van bonnen die nog
-- niet op een factuur staan. Gefactureerde bonnen blijven ongemoeid. Aanroep alleen vanuit de edge function.
create or replace function wb_herprijs(p_project integer default null)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare n integer;
begin
  update wb_bonregel r
     set prijs = x.prijs, bedrag = round(r.totaal * x.prijs, 2)
    from (
      select r2.id, coalesce(pt.prijs, t.prijs) as prijs
        from wb_bonregel r2
        join wb_bon b on b.id = r2.bon_id
        join wb_tarief t on t.id = r2.tarief_id
        left join wb_projecttarief pt on pt.project_id = b.project_id and pt.tarief_id = r2.tarief_id
       where b.status <> 'gefactureerd' and (p_project is null or b.project_id = p_project)
    ) x
   where r.id = x.id and (r.prijs is distinct from x.prijs or r.bedrag is distinct from round(r.totaal * x.prijs, 2));
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function wb_herprijs(integer) from public, anon, authenticated;
grant execute on function wb_herprijs(integer) to service_role;

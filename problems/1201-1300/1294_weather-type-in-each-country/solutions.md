# Solutions — Weather Type in Each Country

## Filter to November, group, round, classify

Only November 2019 rows matter, and a `BETWEEN '2019-11-01' AND
'2019-11-30'` filter on the date removes every other month in one predicate
— including the December and October rows planted as decoys. Grouping what
survives by `country_id` gives each country its November average through
`AVG(weather_state)`.

The classification thresholds apply to the _rounded_ average, so the
rounding happens before the comparison: `ROUND(AVG(weather_state))` snaps
the mean to an integer (half away from zero, matching the reference
outputs), and a `CASE` expression maps that value onto Cold at 15 or below,
Hot at 25 or above, Warm in between. The final step joins the grouped
result back to `Countries` — or aggregates a join that starts there — so
the answer carries `country_name`, and the inner join's drop of
countries with no November rows implements the "no data, no row" rule for
free.

**Complexity:** `O(w + c)` time over `w` weather rows and `c` countries
(with the grouping hash or index doing the heavy lifting), `O(c)` space.

# Solutions — Hopper Company Queries III

## Recursive CTE for the month scaffold, then a windowed sum over it

The query first builds a twelve-row `months` scaffold with
`WITH RECURSIVE months (month) AS (...)`, the same anchor-plus-step
pattern used across the Hopper series: start at `1`, add one per
iteration while the previous value stays below `12`. A `monthly` CTE
then attaches, to each scaffold row, two correlated scalar subqueries
that join `AcceptedRides` to `Rides` on `ride_id` and sum
`ride_distance` (respectively `ride_duration`) over the rows whose
`requested_at` falls in that exact year-month, matched with
`strftime('%Y-%m', ...)` against `printf('2020-%02d', months.month)`
so only 2020 counts and a month with no accepted rides falls back to
`0` via `COALESCE`.

The final `SELECT` restricts the scaffold to starting months `1`
through `10` and, for each one, sums `monthly.total_distance` (and
`total_duration`) over the three rows whose `month` falls between the
starting month and two months later — `BETWEEN starts.month AND
starts.month + 2` — divides by `3.0`, and rounds to two decimal places
with `ROUND`. Because the twelve-month scaffold is fully materialized
before any window is evaluated, the window for month `10` can reach
December without any special-casing, and the last two months of the
scaffold (`11` and `12`) never appear as a `month` in the output but
still supply totals to the windows that end there.

**Complexity:** proportional to ten times the size of `AcceptedRides`
joined with `Rides`, since each of the ten output rows re-sums three
correlated month subqueries that each rescan the join.

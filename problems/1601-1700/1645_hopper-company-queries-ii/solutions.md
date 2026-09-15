# Solutions — Hopper Company Queries II

## Recursive CTE for the month scaffold, correlated subqueries per month

The output still needs exactly twelve rows regardless of what the
driver and ride tables contain, so the query opens with the same
`WITH RECURSIVE months (month) AS (...)` scaffold used for the sibling
query: an anchor row at `1`, then a recursive step that adds one row
per iteration while the previous value stays below `12`.

Each scaffold row drives two correlated scalar subqueries, computed in
a chained `WITH` so the CASE at the end only has to read named
columns. `available_drivers` counts `Drivers` rows whose `join_date`
is strictly before the first day of the _next_ calendar month —
`date('2020-' || printf('%02d', months.month) || '-01', '+1 month')`
— which is "on or before this month's last day" without hardcoding
how many days any given month has, and naturally includes drivers who
joined in an earlier year. `working_drivers` joins `AcceptedRides` to
`Rides` on `ride_id`, filters to rows whose `requested_at` falls in
that exact year-month via `strftime('%Y-%m', ...)`, and counts
`DISTINCT driver_id` so a driver who accepted several rides in the
same month is still counted once. The final `SELECT` divides the two,
multiplies by `100.0`, and rounds to two decimal places with `ROUND`
— except when `available_drivers` is `0`, when the `CASE` reports `0`
directly rather than dividing by zero.

**Complexity:** proportional to twelve times the size of `Drivers`
plus `AcceptedRides` joined with `Rides`, since each of the twelve
month rows re-scans both tables through its own correlated subquery.

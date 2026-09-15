# Solutions — Hopper Company Queries I

## Recursive CTE for the month scaffold, correlated subqueries per month

The output needs exactly twelve rows, one per month of 2020, whether or
not any driver or ride touches that month — so the query cannot simply
group existing rows by month; it must first manufacture the scaffold.
`WITH RECURSIVE months (month) AS (...)` builds that scaffold directly:
the anchor row starts at `1`, and the recursive step adds one more row
per iteration while the previous value stays below `12`, producing the
integers `1` through `12` regardless of what the driver and ride tables
contain.

Each scaffold row then drives two correlated scalar subqueries.
`active_drivers` counts `Drivers` rows whose `join_date` is strictly
before the first day of the _next_ calendar month — `date('2020-' ||
printf('%02d', months.month) || '-01', '+1 month')` — which is exactly
"on or before this month's last day" without needing to know how many
days that month has, and naturally includes drivers who joined in an
earlier year. `accepted_rides` joins `AcceptedRides` to `Rides` on
`ride_id` and counts the rows whose `requested_at` falls in that exact
year-month, compared with `strftime('%Y-%m', ...)` so a ride's month
counts once, tied to when it was requested rather than to any later
acceptance bookkeeping. `ORDER BY months.month` finishes the query with
the required ascending sort.

**Complexity:** proportional to twelve times the size of `Drivers` plus
`AcceptedRides` joined with `Rides`, since each of the twelve month rows
re-scans the driver and ride tables through its own correlated
subquery.

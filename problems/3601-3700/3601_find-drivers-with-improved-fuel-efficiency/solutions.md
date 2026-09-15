# Solutions — Find Drivers with Improved Fuel Efficiency

## Average per-trip ratios within each half, then subtract

A driver's efficiency for one trip is `distance_km / fuel_consumed`, and the
statement asks for the _average of those ratios_ per half-year — not the
ratio of the sums. So the query first derives one fact row per trip: joining
`trips` to `drivers` on `driver_id` keeps only trips that belong to a known
driver, and alongside the driver key it computes the per-trip ratio and the
month number from `trip_date`. The month, not the full date, is the only
calendar information the halves need: `strftime('%m', ...)` extracts it, and
`m <= 6` versus `m >= 7` is the January–June / July–December split.

The outer block then collapses those fact rows with a single `GROUP BY
driver_id, driver_name`. Each average is a conditional aggregate —
`AVG(CASE WHEN m <= 6 THEN eff END)` averages the first-half ratios because
`CASE` without an `ELSE` yields `NULL` for the other months and `AVG`
ignores NULLs — so one grouped pass produces both halves' means. The
`HAVING SUM(m <= 6) > 0 AND SUM(m >= 7) > 0` clause enforces the only
inclusion rule the statement states: a driver must have at least one trip in
each half. `efficiency_improvement` is `ROUND` of the difference of the two
_unrounded_ averages — Bob Smith in the example shows why: his displayed
means are 13.33 and 11.24, whose difference is 2.09, but the true means
differ by 2.0959…, which rounds to the expected 2.10. `first_half_avg` and
`second_half_avg` are rounded on their own, and the final `ORDER BY`
presents rows by improvement descending then name ascending.

**Complexity:** `O(T + D log D)` time for `T` trips and `D` qualifying
drivers (one scan to group plus a sort for the presentation order),
`O(D)` space beyond the input.

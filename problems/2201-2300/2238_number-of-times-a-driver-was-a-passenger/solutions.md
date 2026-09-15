# Solutions — Number of Times a Driver Was a Passenger

## Self-join rides onto the passenger seat

A driver's count must include the rides where they themselves sat as a
passenger, so the query joins `Rides` against itself: every row `r` of the
left-hand copy (one per driver) is paired with every ride `p` whose
`passenger_id` matches `r.driver_id`. Keeping the join left ensures a
driver with no passenger appearances still produces a row.

`COUNT(DISTINCT p.ride_id)` collapses each driver's matched rides into the
requested number — distinct because the join can repeat a ride once per
driving row — and grouping by `driver_id` yields one row per driver, with
the count naturally reading zero for drivers the `LEFT JOIN` left
unmatched.

**Complexity:** one grouped self-join over the rides table, `O(n²)` pair
comparisons in the naive engine, `O(n)` space for the grouping.

# Solutions — Find Top Performing Driver

## Join trips to vehicles and drivers, rank each fuel type's driver aggregates

The answer's grain is one row per fuel type, so the query first rebuilds
each (fuel_type, driver) pair from the three tables: every trip is a fact
row, `Trips` joins `Vehicles` on the trip's vehicle to learn which driver
drove it and on what fuel, and that result joins `Drivers` on `driver_id`
to carry the accident count the third tiebreaker needs. Inner joins are
the right shape here — a trip whose vehicle or driver is missing has no
fuel type to be ranked under, and the statement only ranks drivers that
actually have trips. `GROUP BY fuel_type, driver_id` then collapses each
driver's trips within a fuel type into one aggregate row: `AVG(rating)`
is the performance score, rounded to two decimals as the statement
requires, and `SUM(distance)` is the total distance the second criterion
compares.

Ranking is an ordering problem, not a filtering one: per fuel type the
winner is the aggregate row with the highest rating, then the longest
total distance, then the fewest accidents. SQLite offers window functions,
so `ROW_NUMBER() OVER (PARTITION BY fuel_type ORDER BY ...)` with exactly
that ordering numbers candidates 1, 2, 3... inside each fuel type, and an
outer select keeps `rn = 1`. The same shape works without window support
by keeping the group rows in a derived table and picking, per fuel type,
the one no other row outranks — identical ordering logic, just spelled as
a correlated subquery. One subtlety lives in the `ORDER BY`: the
comparison runs on the _rounded_ average, because the statement defines
the score as the rounded value before any ties are considered; ranking on
the raw mean could order two drivers differently than their displayed
scores imply.

The final `ORDER BY` presents the table by `fuel_type` ascending; the
judge compares result rows as an unordered multiset, so that clause is
presentation rather than correctness. Cost-wise, grouping scans every
trip once against hash or index probes into the two dimension tables, and
the window adds one sort of the grouped rows: linear in trips plus a sort
of the (fuel type, driver) pairs.

**Complexity:** `O(T log D)` time for `T` trips and `D` grouped
(fuel type, driver) pairs (`O(T)` when the group rows fit in memory and
no index probe degrades to a scan), `O(D)` space beyond the input.

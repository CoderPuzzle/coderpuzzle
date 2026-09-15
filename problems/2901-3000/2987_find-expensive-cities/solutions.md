# Solutions — Find Expensive Cities

## Per-city average against a scalar national average

The query groups `Listings` by `city` and filters the groups with a
`HAVING AVG(price) > (SELECT AVG(price) FROM Listings)`. The subquery is
uncorrelated, so it runs once: it reduces the whole table to the single
national average, and each group's average is then compared against that one
scalar. `HAVING` (not `WHERE`) is the right filter because the condition is
about an aggregate of the group, not about an individual row.

A city's listings all share one output value, so grouping collapses each
city to exactly one candidate row; the ones whose average strictly exceeds
the national figure survive, ties are dropped by the strict `>`, and
`ORDER BY city` emits the winners in the ascending order the statement
fixes. An empty table leaves no groups, hence no rows.

The inner scan and the grouping scan each touch every row once; with `L`
listings and `C` cities that is two linear passes plus an `O(C log C)` sort
of the group keys.

**Complexity:** `O(L + C log C)` time, `O(C)` space.

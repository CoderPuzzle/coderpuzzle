# Solutions — List the Products Ordered in a Period

## Approach: Join, filter the month, group, threshold

Only February 2020 orders can contribute, so the `Orders` rows are filtered
to that month before anything is aggregated — an ISO date's month is the
prefix `'2020-02-'`, which `LIKE` (equivalently `BETWEEN '2020-02-01' AND
'2020-02-29'`, leap year included) selects without a function call per row.
The survivors are joined to `Products` for the name and grouped by product,
summing `unit`; the `HAVING` clause keeps exactly the groups whose total is
at least 100. Grouping after the join is safe because every surviving row
matches exactly one product row (`product_id` is the primary key of
`Products`), so no sum is inflated.

Any output order is allowed, so the query needs no `ORDER BY`.

**Complexity:** `O(R)` time over `R` order rows (plus the sort the engine
may build for grouping), `O(P)` space for `P` qualifying products.

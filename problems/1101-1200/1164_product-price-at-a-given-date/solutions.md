# Solutions — Product Price at a Given Date

## Latest applicable change, unioned with the defaulted products

For each product the answer is its newest price among the changes dated on
or before 2019-08-16. The first arm of the query does exactly that:
`ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY change_date DESC)`
numbers each product's already-filtered changes newest-first, and keeping
`rn = 1` yields one row per product that has an applicable change.

The second half handles the initial price. A product whose **earliest**
change postdates the as-of date has no applicable row at all, yet still
belongs in the output with price 10 — product 3 in the example. The second
arm groups by product and emits `10` exactly when
`MIN(change_date) > '2019-08-16'`, which is precisely the "never changed on
time" condition. A plain `UNION` glues the arms: they can never collide
(their product sets are disjoint), so the dedup is a formality, and the
result carries every mentioned product exactly once.

**Complexity:** `O(N log N)` for the per-product date sort over `N` Products
rows plus one grouped scan, `O(N)` space for the ranked intermediate.

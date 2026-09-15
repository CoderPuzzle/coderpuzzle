# Solutions — Warehouse Manager

## Join, multiply per row, and sum by warehouse

Join `Warehouse` to `Products` on `product_id` so each row carries both
the stocked quantity and the item's three dimensions. Multiplying
`units` by `Width * Length * Height` on that joined row gives the
cubic feet a single line item occupies; grouping by `name` and summing
that product folds every product a warehouse stocks into one total.

Because the join is on the shared `product_id` key and every product
referenced by `Warehouse` exists in `Products`, no outer join or
null-handling is needed — each warehouse row matches exactly one
product row before the aggregation runs.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the number
of rows in `Warehouse` — every row is visited once by the join and
once by the aggregation.

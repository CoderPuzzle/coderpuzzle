# Solutions — Rearrange Products Table

The wide table keeps each product's availability sideways — one column
per store — and the answer needs it lengthwise: one row per
(product, store) pair that actually carries a price. The store universe
is fixed by the schema (`store1`, `store2`, `store3`), so the whole
problem is reshaping columns into rows while letting the `NULL` cells
fall away.

## Union all unpivot

Each output row traces back to one column of one input row, so the
unpivot is three arm-in-arm `SELECT`s: for each store column, project
`product_id`, the column's name as a string literal, and the column's
value. `WHERE store1 IS NOT NULL` (and its siblings) does the dropping
— spelled `IS NOT NULL`, not a bare truthiness filter, because a price
of `0` is a real availability and must survive. The arms are joined
with `UNION ALL` rather than `UNION`: the comparison is over the
multiset of rows, and nothing here deduplicates anyway — `product_id`
is unique per input row, so no two output rows can be fully identical.
The result order is free under the multiset comparison.

With `n` table rows, the three constant-width arms scan the table three
times and emit at most `3n` rows; no state beyond the output itself.

**Complexity:** `O(n)` time, `O(n)` space.

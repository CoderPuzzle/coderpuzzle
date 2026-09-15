# Solutions — Product's Price for Each Store

The output is a pivot: one row per `product_id` and one column per
store, and the store universe is fixed — the schema's enum lists
exactly `store1`, `store2`, and `store3`. Since `(product_id, store)`
is the primary key, each cell of that grid is fed by at most one row,
so the whole problem is reshaping rows into columns.

## Conditional aggregation

Group the rows by `product_id` and compute each store column with an
aggregate whose argument is non-NULL only for that store's rows:
`MAX(CASE WHEN store = 'store1' THEN price END)`. Inside a group the
`CASE` yields the single price for matching rows and `NULL` for the
others, and `MAX` ignores `NULL`s — so the column lands on that one
price. When a product is not carried by a store, the group holds no
matching row at all, every candidate is `NULL`, and `MAX` returns
`NULL`, which is exactly the required empty cell. `MAX` never combines
values across rows, so equal or zero prices survive unchanged. The
result order is free under the multiset comparison.

With `n` table rows and `d` distinct products, the single grouped scan
does constant work per row; the groups themselves are the only extra
state.

**Complexity:** `O(n)` time, `O(d)` space.

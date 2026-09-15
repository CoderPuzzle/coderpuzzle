# Solutions — Sales Analysis II

## Match the S8 product id, then exclude iPhone buyers

The buyers to report are exactly those who have a `Sales` row for the
product named `S8` and none for the product named `iPhone`. Resolving
each name to its `product_id` through the `Product` table — a scalar
subquery per name — lets the `WHERE` clause test membership directly:
the outer `WHERE` keeps a sale whose `product_id` equals the `S8` id,
and `buyer_id NOT IN` the list of buyers who ever bought the `iPhone`
id removes anyone on both sides. `DISTINCT` collapses multiple `S8`
purchases by the same buyer into one result row.

The `NOT IN` subquery reads `Sales` once, filtering to `iPhone`
purchases, so the exclusion list is a plain scan; `buyer_id` is never
`NULL` per the table contract, so the anti-membership test is exact.

**Complexity:** `O(N)` time and `O(B)` space for `N` Sales rows and `B`
distinct buyers of `iPhone`.

# Solutions — Product Sales Analysis II

## Group Sales by product_id and sum quantity

Every row in `Sales` names one sale of some `product_id` in some
`year`; grouping the rows by `product_id` collects every sale of a
given product into one bucket, and summing `quantity` within each
bucket gives the total units sold for that product across all years.
A product with a single sale still forms a group of size one, so the
aggregate collapses to that row's own quantity.

Each `Sales` row is read once and folded into its product's running
sum, so the query runs in a single pass over `Sales`.

**Complexity:** `O(N)` time and `O(P)` extra space, for `N` Sales rows
and `P` distinct products.

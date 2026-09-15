# Solutions — Product Sales Analysis III

## Filter Sales down to each product's earliest (product_id, year) pair

A subquery groups `Sales` by `product_id` and takes `MIN(year)` to find
each product's first year of sale. The outer query then keeps every
`Sales` row whose `(product_id, year)` pair matches one of those
first-year pairs — matching on the pair, not just the year, is what
lets a product with several sale rows in its earliest year all survive
the filter, since each surviving row still carries its own `quantity`
and `price` rather than an aggregate.

Computing the per-product minimum year is one pass over `Sales`, and
matching rows back against it is a second pass, so the whole query
scans `Sales` a constant number of times.

**Complexity:** `O(N)` time and `O(N)` extra space, for `N` rows in
`Sales`.

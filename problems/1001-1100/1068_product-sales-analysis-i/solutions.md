# Solutions — Product Sales Analysis I

## Join Sales to Product on product_id

Each `Sales` row already names one sale event with its own `year` and
`price`, so the report is a straight row-for-row projection — no
grouping or aggregation is needed. Joining `Sales` to `Product` on
`product_id` attaches the matching `product_name` to every sale; since
`product_id` is a foreign key into `Product`, the inner join keeps
every `Sales` row exactly once and never drops or duplicates a sale.

Each `Sales` row is read once and matched to its `Product` row through
an index or hash lookup on `product_id`, so the query runs in one pass
over `Sales` plus the cost of resolving each lookup.

**Complexity:** `O(N + M)` time and `O(1)` extra space, for `N` Sales
rows and `M` Product rows.

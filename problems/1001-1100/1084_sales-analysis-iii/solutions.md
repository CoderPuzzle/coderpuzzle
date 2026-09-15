# Solutions — Sales Analysis III

## Require one first-quarter sale and forbid every other

A product qualifies exactly when it has at least one sale inside the
first quarter of 2019 and zero sales outside that window. The query
expresses both conditions per product with correlated `EXISTS`
predicates: one requires a `Sales` row whose `sale_date` lies in
`[2019-01-01, 2019-03-31]`, and the other requires there to be no row
with a date before or after that range. A product with no sales at all
fails the first predicate and is naturally absent.

Because `sale_date` is stored in ISO form, the inclusive range and the
outside-range disjunction both compare lexicographically without any
date arithmetic. The `Product` table drives the scan, so each product is
examined exactly once and never duplicated in the output.

**Complexity:** `O(P + S)` time and `O(1)` extra space for `P` Product
rows and `S` Sales rows (the correlated lookups match on `product_id`).

# Solutions — Customers Who Bought All Products

## One Group per Customer, Sized Against the Catalog

This is a classic relational-division query. Group `Customer` by
`customer_id` and compare the number of distinct products each customer
bought against the size of the full catalog, computed once with the
scalar subquery `(SELECT COUNT(*) FROM Product)`. `COUNT(DISTINCT
product_key)` collapses duplicate purchase rows before counting, so a
customer who bought a product twice is judged exactly the same as one
who bought it once. Since `product_key` only ever references a real
row in `Product`, a customer's distinct product count can never exceed
the catalog size — it reaches equality only when they have bought every
product, so `HAVING` keeps precisely the customers who bought
everything and drops the rest.

Each `Customer` row is read once and folds into a per-customer
accumulator, so with hash grouping the query runs in one linear sweep
over the table (sort-based plans add a log factor); the catalog-size
subquery is evaluated once and reused as a constant.

**Complexity:** `O(N + P)` time and `O(C)` space, for `N` Customer rows,
`P` Product rows, and `C` distinct customers.

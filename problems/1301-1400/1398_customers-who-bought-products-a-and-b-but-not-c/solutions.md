# Solutions — Customers Who Bought Products A and B but Not C

## Set membership via correlated subqueries

A customer qualifies exactly when their `customer_id` appears among the orders of product `A`, appears among the orders of product `B`, and appears nowhere among the orders of product `C`. Three membership tests against `Orders` express that directly, and they compose with `IN` / `NOT IN` because each looks for the presence of rows, not a count — repeat purchases of `A` do not change membership.

The query filters `Customers` with those three subqueries and returns the surviving `customer_id` and `customer_name` pairs, ordered by `customer_id` as the statement demands. Each subquery scans the orders once, and SQLite can evaluate them as semi-joins.

**Complexity:** `O(C + O)` time over `C` customers and `O` order rows, `O(C)` output space.

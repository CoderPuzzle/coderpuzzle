# Solutions — The Most Frequently Ordered Products for Each Customer

## Compare each customer-product count against that customer's own maximum

Grouping `Orders` by `customer_id, product_id` collapses each
customer's rows into one count per product they ever ordered. A
correlated subquery, `SELECT MAX(order_count) FROM (... GROUP BY
product_id ...) WHERE customer_id = t.customer_id`, recomputes the
highest count reached by whichever customer the outer row `t`
belongs to. Keeping only the rows where a product's count equals that
maximum keeps every product tied for most-ordered — one when a single
product pulls ahead, several when two or more share the top count,
and none for a customer who never placed an order, since they never
supply an outer row to compare against.

The filtered rows join `Products` to attach the display name, giving
the required `customer_id`, `product_id`, `product_name` columns; the
statement accepts the result in any order, so no final sort is
needed.

**Complexity:** `O(n log n)` time and `O(n)` space, where `n` is the
number of orders — grouping and the correlated subquery's per-customer
aggregation dominate the otherwise-linear join and projection.

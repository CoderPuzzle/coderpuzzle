# Solutions — The Most Recent Orders for Each Product

## Compare each order's date against its own product's maximum

A correlated subquery, `SELECT MAX(order_date) FROM Orders o2 WHERE
o2.product_id = o.product_id`, recomputes the latest order date for
whichever product the outer row `o` belongs to. Keeping only the rows
where `o.order_date` equals that maximum keeps every order that
reached its product's most recent date — one when the product was
ordered once that day, several when multiple orders (from any
customers) landed on it, and none for a product absent from `Orders`
entirely, since it never supplies an outer row to compare.

The filtered rows join `Products` to attach the display name, and the
final `ORDER BY` sorts by `product_name`, then `product_id`, then
`order_id` exactly as the statement specifies, breaking each tie in
turn.

**Complexity:** `O(n log n)` time and `O(n)` space, where `n` is the
number of orders — the correlated subquery scans each product's
orders to find its maximum date, and the final sort dominates the
otherwise-linear join and projection.

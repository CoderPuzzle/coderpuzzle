# Solutions — The Most Recent Three Orders

## Rank each customer's orders by recency with a window function

`ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC, order_id DESC)`
numbers every order within its own customer's partition, starting at 1
for the most recent one. Ordering primarily by `order_date DESC` puts
the newest order first; the secondary `order_id DESC` only ever
breaks a same-date tie, which the schema rules out in practice but the
window still resolves deterministically if it happens. Filtering the
ranked rows to `rn <= 3` keeps exactly a customer's most recent three
orders — or every order they have, if they placed fewer than three,
since the rank never climbs past however many rows that partition
holds.

The ranking is computed in a derived table because the filter needs
the window's output, and a window function is evaluated after the
`FROM` clause but before any `WHERE` on its own result. The filtered
rows then join `Customers` to attach the display name and project the
four requested columns.

**Complexity:** `O(n log n)` time and `O(n)` space, where `n` is the
number of orders — the window function sorts each customer's orders
by date, and the join and projection are linear passes.

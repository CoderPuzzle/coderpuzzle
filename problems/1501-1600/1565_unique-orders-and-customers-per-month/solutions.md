# Solutions — Unique Orders and Customers Per Month

## Filter first, then group by the formatted month

Keeping only the rows where `invoice > 20` before any grouping means a
month with no qualifying orders never reaches the `GROUP BY` at all —
it simply produces no group, which is exactly how the statement wants
a below-threshold month to disappear from the result rather than show
up as a zero row. `strftime('%Y-%m', order_date)` collapses each
surviving order's date down to its calendar month, and grouping by
that expression aggregates every qualifying order sharing a month
into one row.

`COUNT(order_id)` over each group counts every qualifying order,
including several from the same customer in the same month, while
`COUNT(DISTINCT customer_id)` counts each customer once no matter how
many qualifying orders they placed that month — the two aggregates
diverge exactly when one customer accounts for more than one of a
month's qualifying orders.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the number
of orders — a single filtered pass builds the per-month groups, and
the output holds at most one row per distinct month.

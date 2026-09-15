# Solutions — Immediate Food Delivery II

## Filter to first orders, then aggregate the share

The percentage now ranges over _customers_, not rows — each customer
contributes exactly one order to the numerator and the denominator, whatever
the table's size. So the query is two stages: reduce the table to one row
per customer, then run the same boolean-sum percentage as a flat scan.

The reduction is `MIN(order_date)` grouped by `customer_id`. Since a
customer's first order date is guaranteed unique, joining that grouped
result back to `Delivery` on `(customer_id, order_date)` selects exactly the
first-order row of every customer — no more, no fewer. On those survivors,
`SUM(order_date = customer_pref_delivery_date)` counts immediate first
orders; scaling by 100.0 before dividing keeps decimal precision, and
`ROUND(..., 2)` finishes it.

**Complexity:** `O(N log N)` time for the grouped minimum plus join over
`N` Delivery rows (SQLite builds a temporary b-tree per grouping),
`O(C)` space for the per-customer minima with `C` customers.

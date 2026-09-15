# Solutions — Immediate Food Delivery I

## One aggregate over a boolean sum

"Immediate" is a per-row property: the two date columns are equal. The
whole problem is one pass over the table — count the rows where that
equality holds, divide by the row count, scale by 100, round.

SQL expresses it without any grouping: `SUM` over a boolean condition adds
1 for each immediate order and 0 otherwise, so
`SUM(order_date = customer_pref_delivery_date)` is exactly the numerator.
The `* 100.0` before dividing forces decimal arithmetic (an integer/integer
division would truncate), and `ROUND(..., 2)` applies the requested
precision to the final percentage — 2 of 6 immediate orders become
33.33.

**Complexity:** `O(N)` time for the single scan over `N` Delivery rows,
`O(1)` space beyond the aggregate.

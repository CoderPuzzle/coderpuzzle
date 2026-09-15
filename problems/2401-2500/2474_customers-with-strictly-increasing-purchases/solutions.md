# Solutions — Customers With Strictly Increasing Purchases

## Year-range fill with a recursive years CTE

A customer qualifies exactly when their yearly totals, read from the year of
their first order to the year of their last order and treating every gap year
as `0`, are strictly increasing. The first CTE (`yearly`) reduces the orders
to one row per `(customer_id, year)` holding that year's `SUM(price)`, and
`bounds` records each customer's first and last year. The recursive CTE
`years` then generates every year in between for every customer, so the
`full` CTE can `LEFT JOIN` the yearly totals back and `COALESCE` the gaps to
`0`.

With the full year-by-year sequence in hand, a single self-join on
consecutive years detects every customer who ever fails: `bad` collects any
`customer_id` where the next year's total is `<=` the current year's — one
such pair is enough to disqualify the customer. The final query subtracts the
bad set from the set of all customers that appear in `yearly` (exactly those
with at least one order) and emits the survivors. The `EXCEPT` keeps the
answer free of duplicates, and the trailing `ORDER BY` makes the emitted
order deterministic.

The recursion materializes one row per customer-year in the union of all
`[first_yr, last_yr]` ranges, and each of the joins and the sort visits those
rows a constant number of times.

**Complexity:** `O(N + Y)` time, `O(Y)` space, where `N` is the number of
orders and `Y` the total number of customer-year cells spanned.

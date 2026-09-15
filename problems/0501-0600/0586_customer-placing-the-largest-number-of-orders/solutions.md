# Solutions — Customer Placing the Largest Number of Orders

## Group by customer and keep the largest group

The customer with the most orders is the largest group of rows keyed by
customer, so the whole answer is one grouping: `GROUP BY customer_number`
collapses each customer's rows into a single group, and because every
`Orders` row is exactly one placed order, the group's `COUNT(*)` is
literally that customer's order total. `ORDER BY COUNT(*) DESC` then
ranks the customers by their totals and `LIMIT 1` keeps the largest; its
`customer_number` is the answer.

The guarantee carries the tie-breaking, not the query: the tests are
generated so exactly one customer places more orders than any other, so
the top group is unique and `LIMIT 1` returns that customer alone — no
tie-break key is needed, and a one-order margin is just the boundary
where that uniqueness still holds. Counting is order-independent, so
`order_number` values — contiguous or not, sorted or not — and insertion
order never change any group's size. Equivalent shapes reach the same
row: a window `COUNT(*) OVER (PARTITION BY customer_number)` repeats each
customer's total on every one of their rows and so needs an extra
`DISTINCT` before ranking, and the follow-up generalization
`GROUP BY customer_number HAVING COUNT(*) = (SELECT MAX(c) FROM (SELECT
COUNT(*) AS c FROM Orders GROUP BY customer_number))` reports several
winners by keeping every group at the maximum instead of just the top
one.

One aggregation pass reads the `N` rows of `Orders` once and materializes
one group per customer, `C` of them; ranking the groups costs a sort, and
a single row leaves.

**Complexity:** `O(N + C log C)` time, `O(C)` space.

# Solutions — Sales Analysis I

## Group by seller and keep the maximum total

The total sales price of a seller is the sum of the `price` column over
their rows in `Sales`. Grouping the table by `seller_id` and summing
`price` yields every seller's total in one pass; the answer is then the
set of sellers whose total equals the maximum. Rather than fetching all
totals and comparing in application code, a scalar subquery computes the
maximum total directly — `SELECT MAX(total) FROM (SELECT SUM(price) AS
total FROM Sales GROUP BY seller_id)` — and the outer grouping keeps
exactly the sellers tied at that value, so ties are reported together.

The derived table over `Sales` is scanned once to produce the per-seller
totals, and the outer grouping scans `Sales` a second time to sum the
same `price` values; no self-join or window function is needed.

**Complexity:** `O(N)` time and `O(S)` space for `N` Sales rows and `S`
distinct sellers (the per-seller totals).

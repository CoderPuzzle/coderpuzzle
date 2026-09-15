# Solutions — Customers with Maximum Number of Transactions on Consecutive Days

## Gaps-and-islands over per-customer date runs

Each customer's transaction dates split into runs of adjacent calendar
days, and the answer is whoever owns a longest run — the classic
gaps-and-islands shape. The first pass puts every row on a continuous
timeline, `julianday(transaction_date)`, and carries its predecessor's
day number alongside: `LAG` over `PARTITION BY customer_id ORDER BY
transaction_date` reaches one row back inside the same customer. A row
continues its predecessor's run exactly when the difference is 1; that
one number is where month and year rollovers stop mattering, because
2023-12-31 and 2024-01-01 are one day apart on the julian timeline even
though string arithmetic would see nothing special tying them together.

The second pass turns run membership into an id: a new run starts at a
row whose predecessor is missing or non-adjacent (`CASE ... THEN 0 ELSE
1`, with the NULL first row falling into the ELSE), and a running SUM of
that flag numbers the runs within each customer in date order. Grouping
by customer and id then counts each run's rows, so `COUNT(*) AS streak`
is that run's length — customer 102's two islands of 1 and 2 come out
as streaks 1 and 2, never a total of 3.

What remains is a two-level maximum: `MAX(streak)` per customer finds
each customer's best run, and the outer query keeps the customers whose
best equals the global maximum, so ties all survive (when nobody has
two adjacent dates every best is 1 and everyone is returned). The final
`ORDER BY customer_id ASC` supplies the required ascending order, which
the judge compares exactly.

Every step is one ordered scan of the rows per window: sorting each
customer's dates dominates, at n log n comparisons for n transactions,
with O(n) intermediate rows across the CTE chain.

**Complexity:** `O(n log n)` time, `O(n)` space.

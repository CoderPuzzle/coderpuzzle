# Solutions — Orders With Maximum Quantity Above Average

"Strictly greater than every order's average" cannot be collapsed into a
single global row-average: per-order averages weight their sums by
unequal product counts, so the binding threshold is the maximum of the
per-order fractions `sum/count`, not `grand_sum/grand_rows`. The exact,
float-free way to compare against all of them at once is to require the
smallest value of `max_quantity * count_j - sum_j` across every order
`j` to be positive.

## Cross-join per-order stats, keep the min margin positive

Aggregate twice: once per candidate order for its `MAX(quantity)`, and
once per order (as `a`) for its `SUM(quantity)` and `COUNT(*)`. A cross
join pairs every candidate with every average; grouping by the candidate
collapses those comparisons into one `MIN(max_quantity * product_count -
total_quantity)` — the tightest integer margin. An order is imbalanced
exactly when that minimum is strictly positive, i.e. its max beats every
average even under exact fraction arithmetic. Ties and repeating-decimal
averages are decided exactly because no division is ever taken.

Two aggregation passes plus an orders-times-orders comparison.

**Complexity:** `O(n + P²)` time (`n` rows, `P` orders), `O(P)` space.

# Solutions — Monthly Transactions I

## One Group By with Conditional Aggregates

All six output columns are functions of a single grouping key — the month
extracted from `trans_date` plus the country — so one `GROUP BY` produces
every row. The two unconditional columns come straight from `COUNT(*)`
and `SUM(amount)`.

The approved columns are the same aggregates wearing a filter. Rather
than joining or subquerying, each carries its own condition inside:
`SUM(state = 'approved')` adds 1 only on approved rows, and
`SUM(CASE WHEN state = 'approved' THEN amount END)` accumulates just their
amounts (declined rows fall through to NULL, which `SUM` ignores). The
month itself is `strftime('%Y-%m', trans_date)` — the first seven
characters of the ISO date, formatted exactly as the output wants.

**Complexity:** `O(N log N)` time for the grouped aggregation over `N`
transactions (SQLite builds a temporary b-tree on the group key), `O(G)`
space for the `G` produced groups.

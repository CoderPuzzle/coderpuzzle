# Solutions — Top Percentile Fraud

## Percent-rank window with a strict 5% cut

"Top 5 percentile of each state" is a per-state property, so the window
function partitions by `state` and orders by `fraud_score DESC`, which
seats every state's riskiest claim at rank 0. `PERCENT_RANK()` returns
`(rank - 1) / (partition rows - 1)` for each row, so a row survives
exactly when fewer than 5% of its state's other rows stand strictly
ahead of it. Rows tied on `fraud_score` share the front rank of their
group — a tie group lands wholly on one side of the cut rather than
being split — and a single-row partition ranks its only row at 0, so it
is kept.

Window results cannot be filtered in the same `SELECT` that computes
them, so the ranking runs in a subquery (or CTE) and `WHERE pr < 0.05`
applies outside it; the strict `<` is exactly the cut the definition
demands. The closing `ORDER BY state ASC, fraud_score DESC, policy_id
ASC` dresses the rows as the statement requires — states alphabetically,
riskiest first within a state, ties broken by ascending `policy_id` (the
judge compares result rows as an unordered multiset, so the sort is for
presentation).

**Complexity:** `O(n log n)` time, `O(n)` space — each partition is
sorted once by score, and the intermediate ranking holds one row per
input.

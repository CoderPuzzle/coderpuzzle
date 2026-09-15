# Solutions — Queries Quality and Percentage

## One grouped pass with two aggregates

Both requested statistics are per-`query_name` averages, so a single
`GROUP BY query_name` computes them together. Quality averages the ratio
`rating / position`; writing the division as `rating * 1.0 / position` keeps
it in floating point, since an integer division would truncate every ratio to
zero before the average ever sees it.

The poor-query percentage is an average too — of the 0/1 indicator
`rating < 3`. SQLite treats a comparison as an integer, so `AVG(rating < 3)`
is already the fraction of poor queries; multiplying by 100 scales it to a
percentage. `ROUND(..., 2)` applies to both columns exactly as the statement
asks.

Because the table may carry duplicate rows and every row contributes
independently to both aggregates, no de-duplication is wanted — the plain
per-row aggregates are the definition.

**Complexity:** `O(n)` time over the `n` input rows, `O(g)` space for the `g`
distinct query names.

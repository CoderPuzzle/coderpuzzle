# Solutions — The Airport With the Most Traffic

## Combine endpoint contributions

Use `UNION ALL` to turn every flight row into one departure contribution and one arrival contribution. Group that stream by airport and sum its flight counts, preserving repeated contributions rather than deduplicating them.

A second CTE retains the totals, and a scalar maximum selects every airport tied at the greatest value. SQLite integer sums provide the needed 64-bit accumulation for large traffic totals.

**Complexity:** `O(r log r)` time and `O(r)` space for grouping `r` flight rows.

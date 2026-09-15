# Solutions — Apples & Oranges

## Conditional sum grouped by day

Each day's two rows carry the same key, so one `GROUP BY sale_date`
gathers them; the difference then needs the apples row counted positive
and the oranges row negative. A `CASE` inside `SUM` does exactly that —
`sold_num` for `'apples'`, `-sold_num` for anything else — so the group's
total is `apples - oranges` without a self-join.

The result needs one row per day sorted chronologically, which the final
`ORDER BY sale_date` supplies; because the column is a real date, the
sort is calendar order rather than string luck. Zeros and negative
differences fall out of the arithmetic unchanged — `2020-05-04` with 15
apples and 16 oranges reports `-1` exactly as the example shows.

Two rows per group, `D` groups: the aggregation is one linear pass.

**Complexity:** `O(n)` for the scan and grouping plus `O(D log D)` for
the final sort, `O(D)` space.

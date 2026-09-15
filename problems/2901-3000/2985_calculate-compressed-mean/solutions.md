# Solutions — Calculate Compressed Mean

## Weighted total over occurrence total, rounded once

Each row compresses `k` identical orders, so the mean's numerator is the
weighted item total `SUM(item_count * order_occurrences)` and its
denominator is the plain order total `SUM(order_occurrences)` — exactly the
two sums the example's arithmetic spells out. The query aggregates both in
one pass over `Orders` and divides.

The `* 1.0` matters: `SUM` over integer columns stays integer, and integer
division would truncate `8900 / 3300` to `2` before `ROUND` ever sees it.
Scaling the numerator first forces a real division, so `ROUND(..., 2)`
rounds the true quotient to two decimals — `2.70` for the example. Being a
plain aggregate, the query returns exactly one row for every dataset, and
`null` when the table is empty, which is the output shape the contract
fixes.

Both sums are single scans with running accumulators; nothing beyond three
scalars is materialized.

**Complexity:** `O(n)` time, `O(1)` extra space.

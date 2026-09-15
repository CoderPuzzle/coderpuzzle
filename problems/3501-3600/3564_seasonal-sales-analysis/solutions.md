# Solutions — Seasonal Sales Analysis

## Season bucketing with a ranking window

Each sale lands in exactly one season through the month number of
`sale_date`, computed with `strftime('%m', ...)` and mapped by a `CASE` —
Winter is the wrap-around bucket (12, 1, 2), so it needs its three months
spelled out while the other three seasons are contiguous ranges. Joining
`products` attaches the category to every sale, and grouping by
`(season, category)` folds the join fan-out into one row per bucket with
`SUM(quantity)` as the popularity score.

The revenue tie-break is computed in integer cents: `ROUND(price * 100)`
snaps each two-decimal price to an exact integer before the sum, so binary
floating-point can never make two orders with the same nominal revenue
differ by one ulp at comparison time — and the final `total_cents / 100.0`
restores the two-decimal figure. The winner per season falls out of a
`RANK()` window ordered by quantity descending, cents descending, category
ascending — the lexicographic clause is what makes the rank unique, since
category names never repeat within a bucket — and the outer query keeps
rank 1 and presents the seasons in ascending order.

**Complexity:** `O(S log S)` for `S` sales (the grouping plus the window's
sort), `O(C)` space for the per-season category buckets.

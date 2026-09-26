# Solutions — Count Subarrays With K Distinct Integers

## Latest occurrences with a segment tree

Fix a right endpoint and order the distinct values by their latest occurrence,
from newest to oldest. A left endpoint produces exactly `k` distinct values
precisely when it is greater than the `(k + 1)`st latest position and no
greater than the `k`th latest position. For each of those top `k` values, it
also has frequency at least `m` precisely when the left endpoint is no greater
than that value's m-th latest occurrence.

A segment tree is keyed by latest positions. Its leaves store an active-value
count and the value's m-th latest position, so it can find the `k`th and
`(k + 1)`st active positions and take the minimum m-th latest position over
the top `k`. If these positions are `lastK`, `lastNext`, and `minM`, this
right endpoint contributes `max(0, min(lastK, minM) - lastNext)` subarrays.
Moving a value's leaf from its old latest position to the current position
takes logarithmic time.

![At right endpoint r = 4 of nums = [1, 2, 1, 2, 2] with k = 2 and m = 2, the values ordered by latest occurrence are 2 (latest 4) then 1 (latest 2), so lastK = 2, there is no (k + 1)-st value, and minM = min(3, 0) = 0 pins the left endpoint to 0 — this endpoint contributes 1 of the answer's 2 subarrays.](figures/solution-latest-occurrence-count.svg)

**Complexity:** `O(n log n)` time, `O(n)` space.

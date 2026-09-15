# Solutions — Rearrange Array to Maximize Prefix Score

## Descending Prefix Sums

Sorting in decreasing order is optimal because it maximizes every prefix
sum at once: for any arrangement, the set of elements appearing before
position `k` has sum at most that of the `k` largest elements, which is
exactly what the descending arrangement places there. Since prefix sum
`i` under descending order dominates prefix sum `i` under every other
rearrangement, the count of positive prefixes — the score — cannot be
beaten by any other ordering.

The greedy then reduces to a single accumulation pass: walk the sorted
array while adding each value into a running total and increment the
score whenever that total is strictly positive. Zeros appended after all
positives never help a total become positive again, and once totals turn
non-positive only negative-or-zero values remain ahead.

Prefix sums can reach `10⁵ · 10⁶ = 10¹¹` in magnitude, beyond 32-bit
range — statically typed languages accumulate in a 64-bit integer and
return only the count, which stays below `10⁵`. JavaScript numbers stay
exact since `10¹¹ ≪ 2⁵³`.

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space (or
`O(log n)` for the sort's bookkeeping).

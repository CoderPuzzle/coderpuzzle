# Solutions — Minimum Size Subarray in Infinite Array

## Prefix-sum hash map over one doubled copy

Split `target` into `k` full copies plus a remainder `rem`: any `n`
consecutive elements of `infinite_nums` sum to `total`, so every window of
length `L` sums to `floor(L / n) * total + W` where `W` is the sum of the
`L mod n` leftover elements and stays below `total`. That decomposition
settles both cases. When `rem == 0`, the shortest subarray with sum
`target` is exactly `k * n` — anything shorter satisfies
`floor(L / n) <= k - 1` and therefore sums below `k * total`, while every
`k * n` window hits it. When `rem > 0`, a hit needs `W == rem` with
`floor(L / n) == k`; since a length-`n` window already sums to
`total > rem`, the leftover window has length below `n`, and one doubled
copy of `nums` contains every such window for every start phase. The answer
is then `k * n` plus the shortest doubled-copy window summing to `rem`, or
-1 when none exists.

To find that shortest window, sweep prefix sums of the doubled copy with a
hash map from prefix value to its first index: a window `(j, i]` sums to
`rem` exactly when `pre[i] - rem == pre[j]`, so each end index looks its
start up in constant time. Because all elements are positive, prefix sums
strictly increase and every value occurs once, so the first occurrence is
the only one; a `0 -> -1` seed covers windows starting at index 0.

Widths: `total` reaches `10^5 * 10^5 = 10^10` and doubled prefix sums reach
`2 * 10^10`, past signed 32-bit, so the fixed-width languages accumulate
sums in 64-bit integers. The answer itself is at most
`k * n + 2n <= target + 2 * 10^5 < 2^31` (each element is at least 1, so
`n <= total` and `k * n <= target`), fitting the 32-bit return; JavaScript
and TypeScript stay exact throughout because every intermediate remains
below `2^53`.

**Complexity:** `O(n)` time, `O(n)` space — one pass over `2n` elements
with a map holding at most `2n + 1` prefix values.

# Solutions — Subsequence Sum After Capping Elements

## Uncapped knapsack plus capped multiples

Splitting each capped array at its cap does all the work. Under cap `x`,
every element above `x` becomes exactly `x`, so if `t` elements sit above
the cap their entire contribution is some multiple `m * x` with
`0 <= m <= t`. The remaining elements keep their values, so their share is
an ordinary subset sum over the pool of elements at most `x`. The answer
for `x` is therefore yes precisely when some subset sum `s` of that pool
satisfies `(k - s)` divisible by `x` with the quotient at most `t`.

The pool only grows as `x` climbs, so one incrementally maintained bitset
knapsack answers every cap. Keep a bitmask `reach` over sums `0..k` with
bit 0 set; on reaching cap `x`, first fold in each element equal to `x`
with a single shifted OR truncated to `k + 1` bits, then walk
`m = 0, 1, 2, ...` while `m <= t` and `m * x <= k`, checking whether bit
`k - m * x` of `reach` is set. That walk takes at most
`min(t, k / x) + 1` steps per cap, which sums to about `k log k` steps
over all caps; the folding across all `n` elements costs about `n * k / 64`
word operations. Every stored sum stays at most `k <= 4000`, so nothing
ever approaches 32-bit range.

**Complexity:** `O(n·k / 64 + k·log k)` time, `O(k)` space.

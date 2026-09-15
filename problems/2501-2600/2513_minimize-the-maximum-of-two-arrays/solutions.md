# Solutions — Minimize the Maximum of Two Arrays

## Binary search on the answer

If the largest integer used is `m`, then among `1..m` exactly `m - ⌊m/d⌋`
values survive for array one (those not divisible by `divisor1`), the same
count works for array two, and only values divisible by _neither_ divisor —
that is, all of `1..m` minus those hit by `lcm(divisor1, divisor2)` — are
free to join either array. So a candidate maximum `m` is feasible exactly
when each survivor pool covers its own count and the unblocked pool covers
both counts combined.

Feasibility is monotone in `m`: every pool only grows as `m` grows, so the
smallest feasible maximum can be located by binary search. Each step costs
constant time plus one Euclidean `gcd` to form the lcm (at most
`10⁵ · 10⁵ = 10¹⁰`, so the lcm itself needs 64-bit arithmetic even though
the answer never does — it is bounded by twice the count total). The upper
search bound `2 · (uniqueCnt1 + uniqueCnt2)` is always feasible because at
least half of any prefix survives any divisor ≥ 2, hence covers both arrays'
needs combined; individual pools cover strictly more.

**Complexity:** `O(log(uniqueCnt1 + uniqueCnt2))` time, `O(1)` space.

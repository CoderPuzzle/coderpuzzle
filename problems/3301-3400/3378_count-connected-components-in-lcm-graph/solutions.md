# Solutions — Count Connected Components in LCM Graph

Two nodes are adjacent exactly when `lcm(nums[i], nums[j]) <= threshold`.
Since the lcm is a multiple of both values, any value above the threshold
can never touch an edge and starts as a singleton — the answer is the
number of connected pieces among the values that fit under the threshold.

## Cover-anchor union-find over divisors

Sieve-style enumeration does all the work: keep `anchor[m]` = the smallest
present divisor of each multiple `m`, and walk the present values in
ascending order. When value `v` is reached it is joined to `anchor[v]` —
a genuine edge because that lcm is `v` itself — and then scans its
multiples `m = 2v, 3v, … ≤ threshold`, unioning `v` with `anchor[m]`
where one already exists (both endpoints divide `m`, so their lcm divides
`m` and is ≤ threshold) and claiming the anchor otherwise. Every genuine
edge `(a, b)` is covered exactly at `m = lcm(a, b)`, where `a` and `b`
are both present divisors and both meet the same anchor. This last point
is why the naive "connect each number to its present multiples" reading
of hint 2 is not enough: `6` and `10` with threshold `30` share an edge
while neither divides the other, and only the per-multiple anchor links
such cross pairs.

Connectivity itself is an iterative union-find with path halving and
union by size. The total work is the harmonic sum
`Σ threshold/v ≈ threshold·ln(threshold)` — about 2.4·10⁶ scans at the
`2·10⁵` ceiling — and values up to `10⁹` are never multiplied, so
everything stays comfortably inside 32 bits.

**Complexity:** `O(n + T log T)` time (`T = threshold`, plus
near-constant amortized DSU finds), `O(n + T)` space.

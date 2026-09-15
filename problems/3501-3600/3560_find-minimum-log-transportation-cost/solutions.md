# Solutions — Find Minimum Log Transportation Cost

## Cut only what doesn't fit, and cut it to the edge

A log of length `<= k` occupies one truck as-is and never justifies a cut
(any cut costs a positive `len1 * len2`). With `n, m <= 2k` and the
transport guaranteed possible, at most one log exceeds `k` — cutting both
would produce four pieces for three trucks — so the whole problem reduces
to the single long log `L` in `(k, 2k]`.

That log must be split once, and both pieces must fit a truck: with pieces
`a` and `L - a`, legality forces `a` into `[L - k, k]`. The product
`a * (L - a)` is a downward parabola, so its minimum on that interval sits
at an endpoint — `a = L - k` (or symmetrically `a = k`), costing
`k * (L - k)`. This is also exactly where the "cut as far apart as
possible" intuition lands once the truck cap is respected: the bare
`1` and `L - 1` split is only legal when `L - 1 <= k`, and there it equals
`k * (L - k)` anyway. Summing `k * (L - k)` over the logs that exceed `k`
gives the answer; the maximum case `L = 2k` costs `k^2 = 10^10`, beyond
32-bit, so the accumulation is 64-bit.

**Complexity:** `O(1)` time, `O(1)` space.

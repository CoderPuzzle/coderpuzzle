# Solutions — Minimum Increments for Target Multiples in an Array

With at most four targets, the whole question is which elements of `nums`
cover which targets. An element can serve several targets at once, but then
it must land on a multiple of their least common multiple, and two groups
must not claim the same element — so the planning space is an assignment of
target subsets to distinct elements, swept with a subset DP.

## Candidate servants, then a subset knapsack

Precompute the lcm of every subset of `target` and read `dp[mask]` as the
cheapest way to satisfy exactly the targets in `mask`. An optimal plan uses
at most `m` elements (one per group of targets), and an exchange argument
shows each group's element can be taken from that group's `m` cheapest
servants: if it were not, one of those `m` elements is unused and swapping
it in costs no more. So the dp only sweeps the few candidate elements that
appear in some subset's top-`m` — at most `15 * m` indices regardless of
`n`. Each candidate relaxes `dp[mask | sub]` with `dp[mask]` plus the
increments to the nearest multiple of the subset's lcm at or above the
element, exactly modeling "one element, one subset".

Subsets whose lcm exceeds `100000` are skipped outright: every value sits
below that lcm, so covering the subset with a single element costs at least
`lcm - 10^4`, while serving the targets separately always costs less than
`sum(target) <= 4 * 10^4` — the skipped branch can never win. The cap also
bounds the lcm fold `l / gcd(l, t) * t` by `10^9`, so every intermediate
fits comfortably in 32 bits, far below `2^53` for JavaScript's `Number`.

**Complexity:** `O(2^m · n + 3^m · min(n, 15m))` time, `O(n)` space, with
`m <= 4`.

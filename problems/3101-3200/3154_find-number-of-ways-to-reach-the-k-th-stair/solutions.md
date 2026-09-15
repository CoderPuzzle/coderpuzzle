# Solutions — Find Number of Ways to Reach the K-th Stair

## Gap combinatorics

Order is the only freedom here: every valid sequence with `x` up-ops and
`y` down-ops ends on stair `2^x - y` regardless of interleaving, because
the climbs contribute exactly `2^0 + ... + 2^(x-1)`. So a sequence ending
on stair `k` forces `y = 2^x - k`, and two constraints fence which `x`
can contribute: the target may not be overshot without compensation
(`y >= 0`), and the down-ops cannot be consecutive, so each must occupy a
distinct gap among the `x + 1` slots before, between, and after the ups
(`y <= x + 1`). Every arrangement inside those fences is genuinely
reached on the stairs too — before any down-op the position is
`2^t - s` with at most `t` downs taken so far, hence at least `1` — so
the stair-0 rule never rejects one. The answer is therefore
`Σ C(x + 1, y)` over all `x` meeting both fences.

The fences pin `x` near `log2(k)`: beyond that the required downs blow
past the gap budget, ending the scan within ~31 iterations. Each term's
binomial is evaluated with a running product whose intermediate values
are themselves binomials — every division lands exactly — under 31 bits,
so 64-bit accumulators hold everything comfortably.

**Complexity:** `O(log² k)` time (`~31` values of `x`, each binomial in
`O(x)` products), `O(1)` space.

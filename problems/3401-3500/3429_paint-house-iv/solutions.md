# Solutions — Paint House IV

Both rules only ever couple a house with its immediate neighbor and with its
mirror across the center, so the row folds: pairing house `k` with house
`n-1-k` leaves just `n/2` decisions, each a choice of two colors. Nine dp
states — the colors of the current pair — carry everything a later pair can
ask about an earlier one, and the total reaches `10⁵ × 10⁵ = 10¹⁰`, beyond
32-bit range.

## Fold the row into equidistant pairs, 9 dp states

Walk the pairs `(k, n-1-k)` from the outermost inward. `dp[a][b]` holds the
cheapest way to paint every pair so far when the current — outermost
unpainted — pair wears colors `(a, b)`; the diagonal is unreachable because
a pair's two houses are mirrors of each other and may not share a color. A
new pair `(a, b)` extends any previous `(t, u)` with `t != a` (the two left
houses are adjacent) and `u != b` (the two right houses are adjacent), paying
`cost[k][a] + cost[n-1-k][b]` on top.

Each step precomputes `e[t][c]`, the best previous total whose right color
differs from `c`; then every one of the six reachable new states resolves
with one two-way `min` over the excluded left color, so a step costs constant
work and the whole fold is a single `O(n)` pass. The answer is the minimum
over the nine final states. With `n` up to `10⁵` and per-house costs up to
`10⁵`, every total is computed on 64-bit integers (JavaScript's `Number`
holds these sums exactly, as they stay below `2⁵³`).

On the first example the fold pays `3 + 2` for the outer pair `(1, 2)` and
`1 + 3` for the inner pair `(3, 2)` — adjacency holds inside each pair's
side and across the pairing boundary, and mirrors differ, totalling `9`.

**Complexity:** `O(n)` time, `O(1)` space (a fixed 3×3 state table).

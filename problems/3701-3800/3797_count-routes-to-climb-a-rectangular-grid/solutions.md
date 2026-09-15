# Solutions — Count Routes to Climb a Rectangular Grid

## Row-by-row DP with prefix-sum windows

Walk the grid from the bottom row to the top, keeping two counts per column:
`up[c]`, the number of routes that start somewhere in the bottom row and are
now standing on the current row's cell `c` having arrived by an up move (the
starting cell counts here), and `same_[c]`, the same but arriving by a
same-row slide. These two states capture everything the movement rules need.
An up move may follow anything, so `up` for the next row aggregates all ways
of standing anywhere in the current row within Euclidean reach; a slide may
not follow another slide, so `same_` feeds exclusively from the fresh `up`
values of its own row. The Euclidean bounds collapse into column windows: a
slide has `dr = 0` so it spans `|dc| <= d`, while an up move has
`1 + dc^2 <= d^2`, i.e. `|dc| <= floor(sqrt(d^2 - 1))` — which is why
`d = 1` forbids diagonal climbs entirely.

Both windows are aggregated with prefix sums over columns (blocked cells
contribute nothing), so each row costs a constant number of linear passes
and the whole grid is processed in `O(n * m)` time. The one subtlety is the
self-slide: the window around `c` contains `c` itself, but staying put is
not a move, so each slide count subtracts its own `up[c]`. Routes finish on
row 0, where stopping is always allowed after an up arrival, and a final
slide along row 0 is allowed as the last move — exactly what the two-state
sum at the end counts.

All arithmetic is modulo `10^9 + 7`; differences of prefix sums are brought
back into range with the usual add-and-mask.

**Complexity:** `O(n * m)` time, `O(m)` space.

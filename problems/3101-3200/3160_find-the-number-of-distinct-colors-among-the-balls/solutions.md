# Solutions — Find the Number of Distinct Colors Among the Balls

## Two maps with running color counts

Rescanning all balls after every query is what makes the naive replay
quadratic; the observation is that a query `[x, y]` touches exactly one ball,
so the multiset of live colors changes by at most one removal and one
insertion. Keep a map from each ball to its current color and a second map
from each color to how many balls currently wear it.

Each query then works in constant time: if ball `x` was already colored,
decrement its old color's count and drop that entry entirely when the count
hits zero — that is the exact moment a distinct color disappears. Next bump
the new color's count and record `y` as ball `x`'s color. The number of keys
alive in the count map is precisely the answer to report after this query,
so `result[i]` is just `len(color_count)`.

Colors are never compared beyond equality and counts only move between 0 and
`n`, so everything fits comfortably in 32-bit integers; colors up to `10⁹`
are hash-map keys only.

**Complexity:** `O(n)` time, `O(n)` space.

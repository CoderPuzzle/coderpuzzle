# Solutions — Number of Black Blocks

## Count only the blocks a black cell touches

A grid of up to 10⁵ x 10⁵ cells holds far too many blocks to visit one by
one, but at most 10⁴ cells are black, and a block can only be non-empty if
some black cell lies inside it. A black cell at `(x, y)` belongs to exactly
the blocks whose top-left corner is one of `(x - 1, y - 1)`, `(x - 1, y)`,
`(x, y - 1)` and `(x, y)` — fewer near the outer edges, where such a corner
would violate the valid range `0 <= x < m - 1`, `0 <= y < n - 1`. So a hash
map keyed by top-left corner accumulates how many black cells each touched
block holds: every coordinate bumps the up-to-four corners around it, and
because the coordinates are pairwise distinct every bump is a different
black cell, which is precisely the per-block count wanted.

The answer array falls out of the map. `arr[i]` for `i = 1..4` counts the
entries holding `i` (no entry can exceed 4, a block has only four cells),
and every block containing at least one black cell is present exactly once,
since each of its black cells enumerates that same corner key. The number
of entries therefore equals the touched blocks, which makes the zero bucket
pure arithmetic: `arr[0] = (m - 1) * (n - 1) - map.size()`. That total
reaches about ten billion on the largest grids, so it overflows 32-bit
integers on its own — count in 64-bit throughout.

**Complexity:** `O(k)` time, `O(k)` space, where `k = coordinates.length`.

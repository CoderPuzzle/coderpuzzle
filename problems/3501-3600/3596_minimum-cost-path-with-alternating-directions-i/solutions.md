# Solutions — Minimum Cost Path with Alternating Directions I

## Reachability case analysis

The move pattern is far more restrictive than it looks. The walk starts at
`(0,0)`, and the first move (odd) can only go right to `(0,1)` or down to
`(1,0)`. Now look at the even move that must follow: from `(0,1)`, "up"
leaves the grid, so the only legal move is left — straight back to `(0,0)`;
from `(1,0)`, "left" leaves the grid, so the only legal move is up — again
back to `(0,0)`. Every odd/even pair therefore returns the walk to the
start, and the whole walk cycles forever among the three cells
`(0,0)`, `(0,1)`, `(1,0)` — for any grid size, since the only even moves
that leave the pair are exactly the ones that fall off the top or left
edge, which exist for every `m, n >= 2`.

So the destination `(m-1, n-1)` is reachable only when it is one of those
three cells: `(1,1)` costs `1` (just the entrance), and `(1,2)` or `(2,1)`
cost `1 + 2 = 3` (enter `(0,0)`, then one odd move into the neighbor, whose
entrance cost is `(0+1)(1+1)` or `(1+1)(0+1)`). Every other grid returns
`-1`. The answer is `O(1)` — no search is needed at all, and the inputs up
to `10⁶` never touch a loop. Values stay tiny (`1`, `3`, `-1`), so 32-bit
integers suffice in every language.

**Complexity:** `O(1)` time, `O(1)` space.

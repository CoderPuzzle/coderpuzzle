# Solutions — Fill a Special Grid

## Recursive Quadrant Filling

The conditions fix one exact value for every cell. The top-right quadrant
holds the smallest `4^(n-1)` numbers, the bottom-right the next batch, then
the bottom-left, and the top-left the largest — and each quadrant is itself
a special grid, so the same rule repeats inside each quadrant. That makes
the grid solvable bottom-up: starting from the trivial 1x1 grid `[0]`, one
level of doubling turns every row `g` of the level-`k` grid into a top row
`[3·4^k + g | g]` and a bottom row `[2·4^k + g | 4^k + g]`, because the
left half is written before the right half and the lower quadrants sit
below the upper ones in the quadrant ordering.

![On example 3 (n = 2) two doubling levels grow [0] into [[3,0],[2,1]] and then, rewriting each row g as [12+g | g] on top and [8+g | 4+g] below, into [[15,12,3,0],[14,13,2,1],[11,8,7,4],[10,9,6,5]] with quadrant offsets 0, 4, 8, 12.](figures/solution-quadrant-doubling-levels.svg)

Each level copies every cell exactly once into the new rows with one
constant offset, so building the full `4^n`-cell grid costs total work
proportional to its size; the offsets stay below `2^(2n) - 1 ≤ 2^20 - 1`,
comfortably inside any integer width. Compared with the natural recursion
of hint 1, the doubling loop needs no recursion at all — the depth would
never exceed `n + 1 ≤ 11` anyway — and it allocates each row once instead
of stitching four sub-grid copies per call.

**Complexity:** `O(4ⁿ)` time, `O(4ⁿ)` space (the output itself holds `4ⁿ`
cells).

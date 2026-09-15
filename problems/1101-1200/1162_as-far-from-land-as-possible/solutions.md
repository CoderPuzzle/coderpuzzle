# Solutions — As Far from Land as Possible

Both sections compute the same object — the field of nearest-land Manhattan
distances over the whole grid — and differ only in how they fill it. The
multi-source BFS grows the field as a wavefront: every land cell seeds the
search at distance 0, and the frontier's level numbers are the distances. The
two-pass DP fills the same field without any search: a cell's distance is one
step past a neighbor's, so a sweep in reading order and a sweep back relax
every cell directly, and the queue disappears.

## Multi-Source BFS

Instead of asking, for every water cell, how far its nearest land is, reverse the direction of search: start one BFS from all land cells simultaneously and expand outward. Because every land cell starts at distance 0, the first time the wavefront reaches a water cell is exactly its distance to the nearest land — a multi-source BFS computes nearest-source distances for all cells in one pass. The last cells absorbed sit at the largest distance, which is what the problem wants.

![All four corner land cells seed the wavefront; the center is reached last, at distance 2.](figures/solution-land-distance.svg)

The grid is copied first (the input must not be mutated), all land cells are seeded into the queue, and a visited marker comes free: a water cell flips to 1 as it is enqueued, so it can never be queued twice. The BFS runs level by level, snapshotting the queue length each round; `dist` counts the levels processed. Each level steps in the four cardinal directions — which matches the Manhattan distance metric here, since on an unobstructed grid the shortest 4-directional path length equals the Manhattan distance.

Two degenerate grids are rejected up front: no land at all (empty seed queue) or no water at all (queue already holds every cell) both return -1. When water exists, the loop runs one final round on the deepest level that adds nothing, so the returned value is `dist - 1`; a grid with land adjacent to water yields 1, as expected. An `n x n` grid is fully processed once.

**Complexity:** `O(n^2)` time, `O(n^2)` space.

## Two-Pass DP

Filling the distance field does not require a search at all. The distance at
a cell relates to the distances at its neighbors: land in the up-left
direction is accounted for by the neighbors above and to the left, land in
the down-right direction by the ones below and to the right, and in each
case the cell sits one step beyond the better neighbor. That is a
recurrence, and it comes with a direction — a sweep from the top-left corner
in reading order settles every cell against up and left, and a second sweep
from the bottom-right corner settles them against down and right.

The code lays out the field first: land cells at `0`, water cells at a
sentinel standing in for infinity — any value above the largest distance the
grid can hold (`2n - 2`) is safe, so `n * n` is the pick. Degenerate grids
answer -1 before any sweeping, exactly as in the BFS: no land leaves no `0`
in the field, no water leaves no sentinel. Each sweep then walks its order
and takes a neighbor's value plus one whenever that improves the cell; land
cells never move, since a neighbor's value plus one is at least 1. The
answer is the largest value in the finished field, tracked while the second
sweep runs.

Two sweeps are enough because Manhattan paths are monotone: the path from a
water cell to its nearest land uses at most two directions, and those
directions always fall to the sweeps in running order — land up-left needs
only the first sweep's moves, land down-right only the second's, and each
mixed quadrant a leading leg of one sweep finished by the other. With land
present, every water cell ends at a true distance, so the maximum is
honest. The input grid is only read, the field is the one allocation, and
each cell is touched a constant number of times.

**Complexity:** `O(n^2)` time, `O(n^2)` space.

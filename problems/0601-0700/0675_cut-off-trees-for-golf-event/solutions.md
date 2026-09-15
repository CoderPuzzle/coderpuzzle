# Solutions — Cut Off Trees for Golf Event

## Breadth-first search, shortest tree first

The rule fixes the itinerary completely: trees must be cut shortest to tallest, so
the stops come in exactly one order and the answer is nothing more than the sum
of the shortest walks between consecutive stops, starting from `(0, 0)`. There is
no tour to optimize — a "greedy" ascending order is the only legal one. Cutting a
tree rewrites its cell to `1`, which is still walkable, so the grid never changes
underneath the walker and every leg can be searched on the original forest.

Each leg is an unweighted shortest path over the four-neighbor walkable cells
(everything except `0`), which is exactly what a breadth-first search computes.
A distance matrix seeded with `-1` doubles as the unvisited mark, and the search
returns the moment the target tree is scheduled. A leg can also fail: a `0` at
`(0, 0)` — the statement only promises at least one tree, not a walkable start —
or an emptied queue both mean some tree can never be reached, and the whole
answer is `-1`.

With `T` trees (at most `m * n` of them) the chain runs `T` searches, and each
search touches every cell at most once, so the work is `T` BFS sweeps of the
grid; the queue and the distance matrix live within one grid.

**Complexity:** `O(T * m * n)` time (worst case `T = m * n`), `O(m * n)` space.

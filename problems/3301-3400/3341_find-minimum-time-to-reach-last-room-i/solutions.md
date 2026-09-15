# Solutions — Find Minimum Time to Reach Last Room I

The dungeon is a shortest-path problem in disguise. Waiting inside a room
is free, and a move into an adjacent room takes exactly one second but
cannot start before the target room opens, so the only question is the
earliest arrival time at each room — a single number per cell, with
relaxations that never lower a settled time. That is exactly the terrain
Dijkstra's algorithm was built for.

## Dijkstra on the grid

Run Dijkstra from (0, 0) over the four-directional grid. Popping a cell
settled at time `t` offers each neighbour an arrival of
`max(t, moveTime[ni][nj]) + 1`: the move cannot begin until the
neighbour's room opens, and it always costs the fixed one second. Every
relaxation produces a time at least as large as the settled one, so edge
weights are effectively non-negative and the first pop of a cell is its
final arrival time. Lazy deletion keeps the heap honest — stale entries
whose stored time has since improved are skipped on pop.

The grid has at most 50 × 50 = 2,500 cells and each cell pushes at most
four heap entries, so the heap holds a few thousand tuples and the whole
run is well inside the limits. Arrival times are bounded by the largest
opening time plus the 98-move walk across the grid, about
10⁹ + 98, which still fits a 32-bit integer.

**Complexity:** `O(n·m·log(n·m))` time, `O(n·m)` space.

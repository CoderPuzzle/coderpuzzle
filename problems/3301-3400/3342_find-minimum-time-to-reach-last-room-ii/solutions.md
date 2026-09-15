# Solutions — Find Minimum Time to Reach Last Room II

The alternating move cost seems to double the state space: whether the
next move costs one second or two depends on how many moves the walk has
already made. A counting argument, though, pins that number down per
cell, and after it the problem is ordinary Dijkstra over the grid — the
hint's (cell, move-parity) state space exists only to be collapsed.

## Dijkstra with the parity folded into the cell

Every move changes `i` or `j` by one, so each move flips the parity of
`i + j`. A walk that has made `k` moves therefore always stands on a cell
whose `i + j` has the parity of `k` — no walk can reach (i, j) with an
arbitrary move count, so which move comes next out of (i, j) is fixed by
the cell itself: the move out of (i, j) costs one second when `i + j` is
even (an even number of moves have been made, so the next is an odd-
indexed move) and two seconds when it is odd. Each cell carries a single
outgoing cost, and Dijkstra runs unchanged: settling a cell at time `t`
offers each neighbour the arrival `max(t, moveTime[ni][nj]) + step` — the
move cannot start before the target room opens — and because arrivals
never decrease along a walk, the first settle of a cell is final, with
lazy deletion discarding stale heap entries.

Distances are bounded by the largest opening time plus the move sums over
the longest shortest walk, at most 10⁹ + 2·(n + m − 2) < 10⁹ + 3000, so
32-bit arithmetic would hold mathematically; the 64-bit distance arrays
keep every intermediate comfortably wide, and JavaScript doubles are
exact far below 2⁵³. The grid reaches 750 × 750, about 1.1 million heap
operations in the worst case, well inside the limits.

**Complexity:** `O(n·m·log(n·m))` time, `O(n·m)` space.

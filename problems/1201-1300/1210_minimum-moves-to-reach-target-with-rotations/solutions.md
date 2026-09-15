# Solutions — Minimum Moves to Reach Target with Rotations

## Breadth-first search over snake states

The snake's configuration is fully described by a state `(r, c, horizontal)`, where `(r, c)` is the upper-left cell of the two occupied cells and `horizontal` records the orientation: horizontal occupies `(r, c)` and `(r, c+1)`, vertical occupies `(r, c)` and `(r+1, c)`. Every move changes the state in one of at most four ways, so the problem is shortest path on a small directed graph of at most `2 * n * n` states with unit edge weights — exactly what breadth-first search solves.

Start from `(0, 0, horizontal)`. From each dequeued state, generate the legal moves: slide right, slide down, and (when the two cells it would swing into are empty) rotate. A visited set keyed by the state prevents re-processing, and the first time the target state `(n-1, n-2, horizontal)` is reached, the number of moves accumulated so far is the answer.

Because all edges have weight one, BFS visits states in nondecreasing distance order, so the first arrival at the target is provably minimal. If the queue empties without ever reaching the target, the grid is unreachable and the answer is `-1`.

**Complexity:** `O(n²)` time, `O(n²)` space.

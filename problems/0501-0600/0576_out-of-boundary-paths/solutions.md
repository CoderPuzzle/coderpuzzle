# Solutions — Out of Boundary Paths

## Layer-by-Layer Path Dynamic Programming

Enumerating walks is hopeless — a 50x50 grid with 50 moves admits astronomically many paths — so the solution counts them instead. After the t-th pass over the grid, `prev[i][j]` holds the number of paths that start at cell `(i, j)` and walk out of the grid within at most `t` moves. The answer for the query is the value at the start cell after `maxMove` passes.

Each pass computes a fresh `cur` table from `prev`: for cell `(i, j)` and each of the four directions, an out-of-grid neighbor contributes exactly 1 (that single step is a path that exits immediately), while an in-grid neighbor contributes its full `prev` count (step there first, then exit from within the remaining budget). Paths that leave are counted at the moment of exit and never extended again, so every path is tallied exactly once — at the layer matching its exit time — rather than being double-counted across later layers. All cells are reduced modulo 10^9 + 7 as they are filled.

The pass structure is what encodes the move budget without any time-indexed dimension: the recurrence is evaluated once per allowed move, and each pass only needs the previous layer, so two m x n tables suffice. `maxMove = 0` is handled up front, since the ball can never leave with zero moves and the loop would otherwise return the zero-initialized layer.

Each of the `maxMove` passes touches every cell once and does constant work (four directions) per cell.

Layer by layer, Example 1 (`m = n = 2`, `maxMove = 2`) fills:

1. Both tables start at zero; the first pass counts single-step exits.
2. Every cell of a 2 x 2 grid is a corner with exactly two out-of-grid neighbors, so pass 1 sets every cell to `1 + 1 = 2`.
3. Pass 2 recomputes cell `(0,0)` as `1 + 1` for its two exits plus the in-grid neighbors' pass-1 values `2 + 2`, giving 6.
4. All four cells are symmetric, so the final layer is all 6s and the start cell's value is the answer 6.

**Complexity:** `O(maxMove · m · n)` time, `O(m · n)` space.

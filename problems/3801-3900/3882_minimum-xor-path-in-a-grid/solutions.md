# Solutions — Minimum XOR Path in a Grid

## Reachable-XOR dynamic programming

The cost of a path is the XOR of its cells, and a single right-or-down
decision at the top-left constrains the whole route — so no local greedy
choice works. The key observation is the size of the state space: every
cell value is at most `1023`, a 10-bit number, so the XOR of any path is
also a value in `0..1023`. That is small enough to track, per cell, the
_set_ of XOR values that some valid path ending at that cell achieves.

`reach[i][j][x]` is true exactly when a path from `(0, 0)` to `(i, j)` has
XOR `x`. The base cell `(0, 0)` only reaches `grid[0][0]`. Every other cell
is entered either from above or from the left, so its reachable XORs are the
union of the two neighbours' sets, each XORed with `grid[i][j]`. Filling the
grid in row-major order makes both neighbours available before the current
cell is processed.

Once the table is full, the smallest `x` with `reach[m - 1][n - 1][x]` true
is the answer; scanning `0` upward guarantees the minimum. Because at most
`m * n <= 1000` cells each hold at most `1024` booleans, the whole table
fits in about a million flags, well inside the memory limit, and the
transitions run in `O(m * n * 1024)` time.

**Complexity:** `O(m * n * 1024)` time, `O(m * n * 1024)` space.

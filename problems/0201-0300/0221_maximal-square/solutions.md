# Solutions — Maximal Square

## Dynamic Programming with a Rolling Row

Let `dp[i][j]` be the side length of the largest all-ones square whose bottom-right corner sits at cell `(i, j)`. If the cell holds `'0'` no square ends there and the value is 0; if it holds `'1'`, a square of side `s` ending here requires squares of side at least `s-1` ending immediately above, immediately left, and diagonally up-left, so `dp[i][j] = min(up, left, diagonal) + 1`. The minimum of the three neighbors is the binding constraint, since a square growing out of this corner must fit inside all three overlapping predecessors.

![The example matrix next to its dp table: both 2s sit at the end of the highlighted 2x2 all-ones block, so the best side is 2 and the area is 4.](figures/solution-dp-table.svg)

The implementation compresses the DP table to two rows of length `n + 1`: `prev` holds the previous row and `curr` the row being filled, with a leading zero column standing in for the out-of-bounds left border. Indexed with a one-offset (`curr[j + 1]` for column `j`), the three neighbors map onto `prev[j + 1]` (up), `curr[j]` (left, already filled this row), and `prev[j]` (diagonal) — all available at read time, which is what lets the fill run in a single left-to-right, top-to-bottom pass.

The maximum side length is tracked in `best` as cells are filled, and the returned area is `best * best`. A board of all zeros never updates `best`, correctly returning 0, and the first row/column work uniformly because the borders act as zeros.

**Complexity:** `O(mn)` time, `O(n)` space.

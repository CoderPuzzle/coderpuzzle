# Solutions — Minimum Falling Path Sum II

## DP with Two Smallest Row Values

The natural DP keeps, for each row, the minimum path sum ending in each column: `cur[j] = grid[i][j]` plus the minimum of the previous row's entries excluding column `j` itself (the non-zero-shift rule forbids reusing a column in adjacent rows). Taking that excluded minimum naively costs a full scan of the previous row per cell, for an O(n³) total.

The optimization is that only two facts about the previous row matter: its smallest value (`min1`, at index `idx1`) and its second smallest (`min2`). For a cell in column j, the best allowed predecessor is the global minimum — unless j happens to be `idx1`, in which case the constraint rules it out and the second minimum takes over. So each cell is computed in O(1) as `grid[i][j] + (min2 if j == idx1 else min1)`, after one linear scan per row to find the two smallest values.

The scan handles ties correctly: a value equal to the current minimum is not smaller than `min1`, but it does land in the `elif` branch and becomes `min2`, so two equal column minima leave both slots filled. The first row initializes the DP with its own values, and the answer is the minimum over the final row. A 1×1 grid simply returns its single entry since no rows follow.

**Complexity:** `O(n²)` time, `O(n)` space.

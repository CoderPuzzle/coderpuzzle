# Solutions — Count Square Submatrices with All Ones

## DP on the Largest Square Ending at Each Cell

Define `cur[j]` as the side length of the largest all-ones square whose bottom-right corner sits at cell (i, j). If the cell itself is 0, no square ends there and the value is 0. Otherwise the square is limited by its three neighbors from the previous partial computation: the cell above (`prev[j]`), the cell to the left (`cur[j−1]`), and the diagonal (`prev[j−1]`). The largest square ending here is one plus the minimum of those three, with cells on the first row or column capped at 1 because they have no room to extend.

The reason this counts every square exactly once is that any all-ones square of side k is uniquely identified by its bottom-right corner, and the DP value at that corner is at least k (it is the maximum side, so it accounts for all k nested squares ending there — sides 1 through `cur[j]`). Therefore simply summing the DP values over all cells yields the total count of squares of every size, with no per-size loops.

![The example matrix with each cell's dp value; the corner 3 certifies the 3 x 3 square, and the cells sum to 15.](figures/solution-square-dp.svg)

The implementation processes the matrix row by row, keeping only the previous row's values (`prev`) and building the current row (`cur`), so the full m × n table is never materialized. Zeros short-circuit via `continue`, leaving the entry at 0.

Edge cases are inherent: a matrix of all zeros returns 0, a single row or column contributes only 1×1 squares for its ones, and the border rule (`i == 0 or j == 0` gives value 1) correctly prevents squares from extending past the matrix edge.

**Complexity:** `O(m · n)` time, `O(n)` space.

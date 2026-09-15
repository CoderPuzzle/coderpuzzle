# Solutions — Count Submatrices with Top-Left Element and Sum Less Than k

## Running column sums with an early row break

A submatrix containing the top-left element is identified solely by its bottom-right corner `(i, j)`, and its sum is the sum of the rectangle `grid[0..i][0..j]`. Maintain `col_sums[j]` = the sum of column `j` accumulated over rows `0..i`; then within row `i` a running horizontal prefix of `col_sums` yields each corner's rectangle sum in O(1), with no 2D prefix table needed.

All grid values are non-negative, so the anchored rectangle sums are nondecreasing as `j` advances along a row: once the running prefix exceeds `k`, every further corner in that row also fails, and the inner loop breaks immediately. Rows deeper in the matrix only add more, so the break never skips valid corners either — deeper rows will break no later than this one, and the algorithm naturally spends most of its time only on the cheap upper-left region when `k` is tight.

The counter increments once per corner whose prefix is at most `k`, which covers single-element submatrices at `(0, 0)` and the `k >= grid[0][0]` boundary condition implicitly.

**Complexity:** `O(m * n)` time, `O(n)` space.

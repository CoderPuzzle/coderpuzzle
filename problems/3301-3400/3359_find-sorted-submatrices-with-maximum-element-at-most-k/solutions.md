# Solutions — Find Sorted Submatrices With Maximum Element at Most K

Every valid submatrix is bounded by its bottom-right corner, and both of
its properties decompose per row: the rows of the submatrix must each be
non-increasing over the chosen column span, and no cell may exceed k. So
what matters at each cell is the length of the sorted prefix of its row
that ends there.

## Per-row run lengths with a column monotonic stack

Sweep the grid row by row. For each cell compute run[j]: the longest
non-increasing run of cells ≤ k ending at column j in the current row — a
cell above k resets it to zero, otherwise it extends the left neighbour's
run when the row keeps decreasing. A column span of width w ending at j is
valid for a row exactly when that row's run[j] is at least w, so counting
submatrices by bottom-right corner (i, j) becomes: for each candidate top
row, how many widths work — i.e. the number of widths up to the minimum
run value over the vertical segment. That is a sum of subarray minima over
the column's run values, maintained by the standard monotonic stack: a
per-column stack of (value, width) pairs with a running sum; appending the
new run value pops equal-or-larger entries (their minima drop to the new
value), and the resulting sum is exactly the number of valid submatrices
ending at the current cell.

Each cell is pushed and popped at most once per column, so the sweep is
linear in the grid with a single row of auxiliary state. The answer grows
to C(m+1, 2) · C(n+1, 2) ≈ 2.5·10¹¹ at the 10³ × 10³ limit — past 32 bits,
so fixed-width languages accumulate in 64-bit integers, while JS Number
remains exact because the count stays far below 2⁵³.

**Complexity:** `O(m · n)` time, `O(n)` extra space.

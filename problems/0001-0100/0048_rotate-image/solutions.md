# Solutions — Rotate Image

## Transpose, then reverse each row

A 90° clockwise rotation sends the element at `(i, j)` to `(j, n - 1 - i)`, and that map factors into two simpler involutions applied one after the other: transposing across the main diagonal, `(i, j) -> (j, i)`, and then reversing every row, `(i, j) -> (i, n - 1 - j)`. Each half is a swap-only operation, so the whole rotation rewrites the given matrix without allocating a second one — exactly what the in-place requirement demands.

The transpose loop walks only the strict upper triangle, `j` from `i + 1`, and swaps `matrix[i][j]` with `matrix[j][i]`; starting both indexes at `0` instead would swap every pair twice and undo itself. The second pass then reverses each row in place. Because column `j` of the transposed matrix reads what row `j` of the original read, the reversal lays it out bottom-up, which is precisely the quarter turn: the first row of the answer is the first column of the input, taken from the bottom.

Once both passes finish the method returns the same `matrix` object it received — now rotated — which is what the judge compares. The center of an odd-sized matrix never moves (both involutions fix it), a 1 x 1 matrix comes back untouched, and negative or boundary values such as `-1000` need no special handling since only positions, never values, are permuted.

**Complexity:** `O(n²)` time, `O(1)` space.

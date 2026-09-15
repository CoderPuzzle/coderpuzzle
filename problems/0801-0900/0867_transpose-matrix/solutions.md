# Solutions — Transpose Matrix

## Swap the indices into a fresh grid

The transpose rule is a pure index swap: the entry at row `i`, column `j`
moves to row `j`, column `i`, so every row of the input reappears as a column
of the result. That swap is why the result cannot be built in place — unless
the input is square, an `m x n` matrix transposes to an `n x m` one, a
different array-of-arrays shape entirely. The result is therefore a freshly
allocated grid of `n` rows and `m` columns, and that grid is the whole space
cost of the algorithm.

The fill is a double loop over the input: read `matrix[i][j]`, write it to
`result[j][i]`. Each of the `m · n` entries is read once and written once,
and every write lands at a distinct cell, so the loop order is free — walking
the input row-major, column-major, or even one output column at a time
produces the identical grid. No entry is consulted twice and no auxiliary
structure is needed; the indices themselves carry all of the geometry.

The degenerate shapes are the same loop in miniature, with no special cases
anywhere: a square input returns a same-shaped copy, a `1 x n` row vector
becomes an `n x 1` column, a single cell maps to itself, and a symmetric
matrix is a fixed point whose transpose still comes back as a fresh grid. The
`m · n <= 10⁵` ceiling bounds the walk at a hundred thousand iterations.

**Complexity:** `O(m·n)` time, `O(m·n)` space.

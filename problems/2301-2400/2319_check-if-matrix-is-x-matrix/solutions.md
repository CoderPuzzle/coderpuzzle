# Solutions — Check if Matrix Is X-Matrix

## Single pass over diagonals

Cell `(row, col)` sits on a diagonal exactly when `row == col` or
`row + col == size - 1`; those cells must be non-zero while every other cell
must be zero. One scan over the grid checks each cell against the branch it
belongs to and returns `false` on the first violation, so a conforming
matrix survives all `n²` checks and earns `true`.

**Complexity:** `O(n²)` time, `O(1)` space.

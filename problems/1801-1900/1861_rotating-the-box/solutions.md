# Solutions — Rotating the Box

Rotation and gravity are independent here: gravity acts along each
original row (which becomes a column of the output), and the rotation is
a pure index permutation. Doing the slide first keeps both passes simple
— one write pointer per row, then one gather loop for the transpose with
reversal.

## Row slide, then clockwise rotate

For every original row, scan right to left keeping `write`, the next
landing cell. An obstacle resets `write` just below itself; a stone swaps
itself with `cells[write]` and decrements — empty cells are skipped
implicitly because a stone only moves when it meets them through the
swap. After all rows settle, emit the rotated matrix using
`out[r][c] = rows[m - 1 - c][r]`, which is exactly a 90-degree clockwise
turn of an m x n grid into n x m.

Each cell is touched a constant number of times across the two passes.

**Complexity:** `O(m·n)` time, `O(m·n)` space for the result.

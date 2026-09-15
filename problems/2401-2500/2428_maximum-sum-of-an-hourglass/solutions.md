# Solutions — Maximum Sum of an Hourglass

## One pass over 3x3 top-left corners

An hourglass occupies exactly the cells of some 3x3 submatrix: the whole
top row, the center cell, and the whole bottom row — and each 3x3
submatrix hosts exactly one hourglass (hint 1). Since an hourglass cannot
be rotated, its top-left corner within the grid identifies it uniquely, so
the candidates are precisely the positions `(r, c)` with `r + 2 < m` and
`c + 2 < n`. Enumerating them visits every hourglass once and nothing
else; there is no overlap or double-count to worry about.

For each corner the sum reads off directly as the three top-row cells,
plus `grid[r + 1][c + 1]`, plus the three bottom-row cells. The middle
row's side cells never participate. A running maximum over these sums is
the answer; initializing it to 0 is safe because every cell value is
non-negative, so any hourglass scores at least 0.

The bound check is comfortable in 32 bits everywhere: seven cells of at
most `10⁶` sum to at most `7 * 10⁶`, far below `2³¹ - 1`, and the double
loop touches at most `148 * 148 ≈ 2.2 * 10⁴` corners with constant work
each.

**Complexity:** `O(m * n)` time, `O(1)` space.

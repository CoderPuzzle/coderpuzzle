# Solutions — Find the Maximum Number of Fruits Collected

## Fixed Diagonal and Two Boundary Dynamic Programs

The first child's moves always advance both coordinates, so after `n − 1`
moves it lands on `(n − 1, n − 1)` only one way — straight down the main
diagonal — and its harvest is simply the diagonal sum. The other two
children advance one coordinate per move (rows for the top-right child,
columns for the bottom-left child), which pins each of them to one side
of the diagonal: reaching row `i` with column `j < i` would leave too
few moves to climb back to column `n − 1`. Touching the diagonal is
legal but worthless — every later move is then forced along it, where
child 1 has already emptied every cell — so each child's optimum is its
best path strictly on its own side, and the two sides never interact.
The shared final cell belongs to the diagonal's count, taken once.

Each side is a per-row DP: at row `i` the walker is somewhere in the
triangle `i < j ≤ n − 1`, and the best score to `(i, j)` is
`fruits[i][j]` plus the best of the three cells reachable one row above
(columns `j − 1, j, j + 1`), with `-1` marking not-yet-reachable cells
(values are non-negative, so `-1` can never be mistaken for a score).
Rows run `1..n − 2` — the final cell is deliberately not scored — and
the top-right answer is the surviving value at column `n − 1`. The
bottom-left child is the identical DP with rows and columns swapped, so
the same routine serves both with transposed reads. The grid sums fit in
64 bits (`≤ 5 · 10⁶` in the worst case, declared wide per the grid-sum
convention), and the DP touches each triangle cell once.

**Complexity:** `O(n²)` time, `O(n)` space.

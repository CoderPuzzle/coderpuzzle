# Solutions — Largest Local Values in a Matrix

## Collapse rows, then columns

Each output cell is the max of nine grid values. The direct approach
re-scans all nine cells for every `(i, j)`, doing 9 comparisons per cell.
Splitting the window along one axis does better: first compute for every
cell the horizontal maximum of its row-triple `grid[i][j..j+2]` — an
`(n) x (n-2)` helper table built with two comparisons per entry — then each
output value is just the vertical max of three of those row results,
another two comparisons.

The decomposition is valid because max is associative: the maximum of a
3 x 3 block factors into the maximum of its three row-maxima regardless of
where the overall largest element sits. Total work drops from `9n²` to
about `6n²` element touches while staying cache-friendly and branch-free;
at `n <= 100` either form is comfortably inside limits, but the two-pass
shape also generalizes to separable sliding-window problems where the win
is decisive.

**Complexity:** `O(n²)` time, `O(n²)` space for the output plus the row
table.

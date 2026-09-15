# Solutions — Check if There is a Path With Equal Number of 0's And 1's

Only right/down moves exist, so every path reaching cell `(i, j)` has
exactly `i + j + 1` visited cells. That pins down the balance — ones
minus zeros — of any path ending there: it is fixed to one parity and
bounded by `i + j + 1 <= m + n - 1`. Instead of exploring paths one by
one, track which balances are achievable at each frontier cell.

## Column bitmask dynamic programming

Walk the grid row by row. Each column stores one bitmask over the window
`[-(m+n-1), m+n-1]`, where bit `b` means "some path from `(0, 0)` to this
cell ends with balance `b`" (bit `x` represents balance `x - (m+n-1)`).
Cell `(i, j)` inherits the union of its top neighbour's mask (previous
row, same column) and left neighbour's mask (current row, previous
column), then shifts that whole set once toward `+1` or `-1` depending on
its own digit — a single arithmetic shift over the packed set. The start
cell seeds bit `half ± 1`, and the answer reads whether balance zero's
bit is still set when the bottom-right corner is processed.

Because a path can never stray beyond the window bound proved above, the
mask needs no re-centering or masking during the sweep: shifted-in bits
outside the used range stay structurally zero. Grids whose total path
length `m + n - 1` is odd fail automatically since no prefix parity ever
hits zero there — but the mask settles those without special-casing.

**Complexity:** `O(m·n·(m+n))` balance-window work (`÷64` with packed
machine words), `O(n·(m+n))` space.

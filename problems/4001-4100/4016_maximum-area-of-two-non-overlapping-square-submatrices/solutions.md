# Solutions — Maximum Area of Two Non-Overlapping Square Submatrices

## Binary search on the side length

The side length is monotone: shrinking each of two disjoint `k`-squares
to its top-left `(k-1)` subsquare leaves every cell usable and keeps the
two pieces disjoint, so whenever side `k` works, every smaller side
works too. That makes the answer a binary search over `k` in
`[0, min(m, n)]` for the largest feasible side, reported as `k * k`
with 0 falling out naturally when even `k = 1` fails. Feasibility of a
side asks for two all-ones `k x k` squares sharing no cell; two squares
at the same corner share everything, and partially overlapping distinct
corners are rejected by the same test.

A 2D prefix sum answers whether any given square is all ones in constant
time. For a fixed `k`, scan every candidate top-left corner and record
the minimum and maximum row and column over the valid corners. A
disjoint pair exists exactly when `max_row - min_row >= k` or
`max_col - min_col >= k`: the corners achieving an extreme row are
themselves valid corners whose row ranges lie `k` apart, hence cell-
disjoint; conversely, if both spans are below `k`, then every pair of
corners differs by less than `k` in both row and column, so their
squares always intersect.

Nothing else needs special casing. A single-row or single-column matrix
caps `k` at 1 and just asks for two separated usable cells; dense grids
are limited by fitting two squares into one dimension (`m >= 2k` or
`n >= 2k`); scattered cells usually stop the search at `k = 1`.

**Complexity:** `O(mn log(min(m, n)))` time, `O(mn)` space.

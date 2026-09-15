# Solutions — Largest Local Values in a Matrix II

Build one two-dimensional greater-than prefix sum for each possible positive
cell value and answer every centered-square query in constant time.

## Thresholded two-dimensional prefix sums

For a threshold `x`, construct a prefix-sum grid whose cell indicator is one
exactly when `matrix[row][col] > x`. Querying the clamped square centered at a
cell with value `x` gives the number of disqualifying values in that square.
The square query includes the four positions whose row and column distances
are both exactly `x`, so subtract each such in-bounds corner when its value is
greater than `x`. The cell is a local maximum precisely when the adjusted
count is zero.

Process thresholds 1 through 200 and inspect only cells equal to the current
threshold. Reusing a single prefix grid avoids storing 201 full grids while
retaining the intended constant-time rectangle query.

**Complexity:** `O(Vnm)` time, `O(nm)` space, where `V = 200`.

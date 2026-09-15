# Solutions — Count Covered Buildings

## Row and Column Extrema

Directions are one-dimensional facts per line: a building at `[x, y]` has a
neighbor to its left exactly when some other building shares the same x with
a smaller y, i.e. when y is strictly inside the range of y values taken on
line x — and symmetrically for right (same x, larger y), above (same y,
smaller x), and below (same y, larger x). So a building is covered exactly
when `minY[x] < y < maxY[x]` and `minX[y] < x < maxX[y]`, where the four
extremes are taken over the buildings on the corresponding line.

One linear pass computes all extremes: four arrays of size n + 1 (per-line
min and max in each axis, initialized to the vacuous `n + 1` / `0`), updated
once per building. A second pass re-walks the buildings and counts those
whose coordinate pair is strictly inside both line ranges; strictness is
what rejects line endpoints, so isolated or edge buildings never count. The
answer is at most the number of buildings, comfortably inside 32-bit range.

Each building is touched twice with O(1) work, and the arrays are O(n);
no sorting or hashing is needed since coordinates already fall in `1..n`.

**Complexity:** `O(n + B)` time, `O(n)` space (B = number of buildings).

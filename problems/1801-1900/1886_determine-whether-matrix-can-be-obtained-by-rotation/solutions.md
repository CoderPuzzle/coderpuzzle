# Solutions — Determine Whether Matrix Can Be Obtained By Rotation

Four 90-degree rotations return any matrix to its start, so the search
space is exactly four candidates — no cleverness is needed beyond
applying the rotation formula and comparing.

## Check all four rotations

Rotate `mat` by 90 degrees up to three times, comparing against
`target` before each rotation (the initial orientation counts as the
fourth candidate). A clockwise rotation maps element `(r, c)` of the
old matrix to `(c, n - 1 - r)` of the new one; building the new matrix
row by row as `new[r][c] = old[n - 1 - c][r]` implements it directly.
If any orientation matches, the answer is true; after four failed
comparisons it is false.

With `n <= 10` there are at most four 100-cell comparisons per query,
which is trivially fast.

**Complexity:** `O(n²)` time, `O(n²)` space for the rotated copy.

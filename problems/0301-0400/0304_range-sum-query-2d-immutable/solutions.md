# Solutions — Range Sum Query 2D - Immutable

## 2D Prefix Sums (Integral Image)

Because the matrix is fixed at construction time, every `sumRegion` queries the same unchanging data — so the summing should happen once, not per call. The `NumMatrix` class precomputes an integral image: `prefix[r][c]` holds the sum of all elements in rows `0..r-1` and columns `0..c-1`, with a guard row and column of zeros on the top and left so index arithmetic never needs boundary checks.

Each entry is built from its three already-computed neighbors by inclusion–exclusion: `prefix[r][c] = matrix[r-1][c-1] + prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1]` — the top-left term is subtracted because the row-strip and column-strip counts both include it. One pass over the matrix fills the whole table.

A query rectangle is then the same inclusion–exclusion in reverse: `sumRegion(r1, c1, r2, c2) = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]`. The two strips above and to the left of the query cancel, leaving exactly the requested rectangle — four lookups and three arithmetic operations, independent of the rectangle's size.

Both the Python and Java canonical solutions implement exactly this table (accumulating into `long`, safely above the worst-case total of `200 · 200 · 10⁴ = 4 · 10⁸`). With at most `10⁴` queries, the whole workload is quadratic preprocessing plus constant-time lookups, satisfying the follow-up.

**Complexity:** `O(m · n)` construction, `O(1)` per `sumRegion`, `O(m · n)` extra space.

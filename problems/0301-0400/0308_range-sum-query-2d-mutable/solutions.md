# Solutions — Range Sum Query 2D - Mutable

## 2D Fenwick Tree (Binary Indexed Tree)

The 1D Fenwick trick lifts to two dimensions by nesting one binary indexed tree per row inside a BIT over the rows. Cell `(i, j)` of the tree stores the sum of the rectangle that is `i & (-i)` rows tall and `j & (-j)` columns wide, ending at `(i, j)`. Queries and updates walk both coordinates with the same low-bit stepping, giving the doubly logarithmic cost the follow-up asks for.

A rectangle query is anchored at the top-left corner: `sumRegion(r1, c1, r2, c2)` expands into inclusion-exclusion over four top-left-anchored prefix rectangles, `prefix(r2+1, c2+1) - prefix(r1, c2+1) - prefix(r2+1, c1) + prefix(r1, c1)`, where `prefix(r, c)` sums rows `0..r-1` and columns `0..c-1`. Each prefix strips low bits from the row index, and for each row strip it strips low bits from the column index, adding disjoint rectangles that exactly tile the region. An update does the dual climb — `i += i & -i` in rows, `j += j & -j` in columns — touching exactly the tree cells whose stored rectangle contains the updated cell, and adds only the delta `val - matrix[row][col]` (a copy of the matrix is kept so subsequent deltas stay correct).

Construction is again linear in the data, `O(m·n)` rather than `m·n` updates: each source row is turned into a 1D Fenwick row in one pass (pushing each accumulated block into its parent column), the row is added into its tree slot, and the finished row's values are pushed whole into the parent row. As in the 1D version, indices are 1-based with row/column 0 unused so the low-bit arithmetic is valid.

The Python and Java canonical solutions implement the identical structure — the Java one stores tree entries as `long`, a safe habit when rectangle sums could exceed 32 bits, while the given constraints (`|matrix[i][j]| ≤ 1000`, `m, n ≤ 200`) already bound sums well within 32-bit range. Grids as small as 1×1 work because every loop still runs at least one valid index.

**Complexity:** `O(log m · log n)` time per `update`/`sumRegion` with an `O(m·n)` build, `O(m·n)` space.

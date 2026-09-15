# Solutions — Maximum Side Length of a Square with Sum Less than or Equal to Threshold

## Prefix Sums with a Growing Side Length

A prefix-sum table `prefix` of size (m+1) × (n+1) is built first, where `prefix[i][j]` holds the sum of the rectangle from (0,0) to (i−1, j−1). With it, the sum of any axis-aligned square is four table lookups and arithmetic — inclusion–exclusion of the corners — so each square query is O(1).

Rather than binary-searching the side length per cell or scanning all sides, the solution keeps a single global answer `ans` and scans every top-left corner (i, j). At each corner it tries to extend: while a square of side `ans + 1` still fits inside the matrix and its prefix-sum value is within the threshold, `ans` is incremented. Because the answer only ever grows, a cell that cannot beat the current best costs a single failed O(1) check, and each successful extension is paid at most once per side length across the whole scan. This amortizes the entire search to a linear pass over the matrix.

Correctness follows from feasibility being monotone in the side: if some square of side k has sum at most `threshold`, larger answers only replace it when genuinely found, and the scan covers every possible top-left corner. Since all entries are non-negative, if no 1×1 square fits the answer legitimately stays 0, matching the problem's requirement for the "no such square" case.

Edge cases: thresholds smaller than every cell yield 0; squares are bounded by both `i + ans < m` and `j + ans < n` before any query, so the prefix table is never indexed out of range.

**Complexity:** `O(m · n)` time, `O(m · n)` space.

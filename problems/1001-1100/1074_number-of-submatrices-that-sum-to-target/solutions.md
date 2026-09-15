# Solutions — Number of Submatrices That Sum to Target

## Row-Pair Collapse with Prefix Sums and Hash Map

Every submatrix is determined by its top row, bottom row, left column, and right column. The trick is to fix the two row bounds and collapse the strip between them into a single array of column sums, which turns the 2D counting problem into the classic "number of subarrays summing to target" over that strip. Precomputed vertical prefix sums vpref let any column sum between rows top..bottom be read in O(1) as a difference of two entries, so building each strip costs one pass over the columns.

Within a strip, the subarray trick is the running-sum hash map: with prefix sum S and an initially seeded map {0: 1}, the number of subarrays ending here with sum target is exactly the count of earlier prefixes equal to S − target. Each column is processed once with one dictionary lookup and one insertion, so counting one strip is O(cols) expected time.

The outer double loop enumerates all O(rows²) row pairs, including single-row strips (top == bottom). This covers every submatrix exactly once because a submatrix's row bounds are one specific pair and its column span is one specific subarray of that strip. Edge cases: negative values are fine since the hash map does not rely on monotonicity, and target 0 with a zero cell is caught by the {0: 1} seed. The final count can be large but fits comfortably for 100×100 inputs.

**Complexity:** `O(rows² · cols)` time, `O(rows · cols)` space.

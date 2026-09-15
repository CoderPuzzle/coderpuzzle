# Sort the Matrix Diagonally

## Approach: Gather, sort, scatter per diagonal

Every cell `(i, j)` belongs to the diagonal identified by the difference
`i - j`, so one pass can bucket all cells by that difference. Each bucket
holds one diagonal's values; sorting a bucket and writing it back along
the same top-left-to-bottom-right walk sorts that diagonal in place — the
walk visits exactly the diagonal's cells in the order the sorted values
must land.

Only the cells on the top row and the left column start diagonals, but
bucketing by `i - j` covers every cell without caring where its diagonal
begins. The result is a fresh matrix of the same shape.

**Complexity:** O(m n log(min(m, n))) time — the sum of sorting each of
the m + n - 1 diagonals — and O(m n) space.

# Solutions — Matrix Diagonal Sum

## Single pass over the row index

Every diagonal element is reachable directly from its row index `i`: the
primary diagonal cell is `mat[i][i]`, and the secondary diagonal cell in
the same row is its mirror image `mat[i][n-1-i]`. Walking `i` from `0` to
`n-1` once therefore visits every diagonal cell exactly the two ways it
can appear, with no need to scan the matrix or track visited positions.

The only care needed is the center cell of an odd-sized matrix, where
`i == n-1-i` and the primary and secondary diagonals meet. Adding both
`mat[i][i]` and `mat[i][n-1-i]` on that row would double-count it, so the
loop adds the mirror term only when the two indices differ. For `n = 1`
this also correctly reduces to counting the single element once.

**Complexity:** `O(n)` time, `O(1)` space.

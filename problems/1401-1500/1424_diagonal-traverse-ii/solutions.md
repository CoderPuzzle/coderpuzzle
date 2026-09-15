# Solutions — Diagonal Traverse II

## Bucket by diagonal, read the buckets backwards

Two cells share a diagonal exactly when their index sums `i + j` match,
and the wanted order asks for the diagonals in increasing sum with the
higher row first inside each one. So the traversal decomposes into:
collect each cell under its `i + j` key, then emit the keys in ascending
order, each key's cells from last-appended to first.

Scanning the matrix row by row appends cells to their bucket in
increasing `i`, which is the reverse of the emission order inside a
diagonal — so each bucket is simply read back to front. A hash map from
diagonal sum to a growable list does the collection in one pass over all
`sum(nums[i].length)` cells; the answer is then concatenated from
diagonal `0` up to the largest sum seen.

Nothing is sorted and no tuples are materialized: the row scan itself
supplies the within-diagonal order, making the whole algorithm a linear
counting pass. The ragged rows cost nothing — a row simply stops
contributing once `j` passes its length, and short rows leave their
diagonal buckets shorter.

**Complexity:** `O(n)` time for `n = sum(nums[i].length)` total cells,
`O(n)` space for the buckets and answer.

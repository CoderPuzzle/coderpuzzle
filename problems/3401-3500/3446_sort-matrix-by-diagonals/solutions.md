# Solutions — Sort Matrix by Diagonals

The two triangles of the matrix are separated by the middle diagonal: cells
with `i - j >= 0` form the bottom-left triangle together with that diagonal,
and cells with `i - j < 0` form the top-right one. Each diagonal is
rearranged independently, so the whole task is to bucket by `i - j`, sort
each bucket in its triangle's direction, and write the values back.

## Diagonal buckets, sorted per triangle

Index the buckets by `i - j` shifted into `[0, 2n - 1)`. A row-major sweep
fills each bucket with its diagonal's values already in
top-left-to-bottom-right order, so after sorting (descending for bucket
index at or past the middle, ascending before it) a second row-major sweep
with one cursor per bucket writes every value back to its cell in the same
order. Diagonals of length one pass through both phases untouched, which is
why a `1 x 1` matrix comes back unchanged.

**Complexity:** `O(n² log n)` time, `O(n²)` space.

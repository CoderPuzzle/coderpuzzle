# Solutions — Count Artifacts That Can Be Extracted

An artifact is extracted exactly when every cell of its rectangle has been
excavated, so the whole problem is membership testing: which of the `dig`
cells fall inside each rectangle. The shape that answers that in constant
time per query is a marked grid.

## Mark the dug cells, then verify each rectangle

First build an `n x n` boolean grid and set one flag per `dig` entry — that
is a single pass over the excavations. Then walk the artifacts: for each
rectangle `[r1, c1, r2, c2]` scan its cells and count the artifact as
extracted when none of the flags is unset. The statement caps every artifact
at 4 cells, so each verification touches a constant number of flags, and the
artifacts are independent of one another — no overlap and unique digs matter
only to make the inputs well formed, not to the counting logic.

Rescanning `dig` for every artifact cell instead would cost
`O(A · C · D)` in the worst case (artifacts × cells × digs), which is
millions of operations too many at the `10⁵` scale of the constraints. The
grid trades `O(n²)` memory — one byte-ish per cell, at most `10⁶` flags for
`n = 1000` — for `O(1)` lookups, bringing the total to
`O(n² + D + A)` time. Every value involved stays far inside 32-bit range:
coordinates are below `n <= 1000` and the answer is at most the artifact
count, so no wider arithmetic is needed anywhere.

**Complexity:** `O(n² + D + A)` time, `O(n²)` space.

# Solutions — Get Biggest Three Rhombus Sums in a Grid

There is no shortcut to the answer's structure — the biggest three
distinct sums can sit anywhere — but the grid is tiny (at most 50x50),
so enumerating every rhombus directly and keeping a best-three set is
both simple and fast enough.

## Enumerate centers and half-diagonals

For every cell treated as the center, grow a rhombus by its
half-diagonal `k`. A rhombus with half-diagonal `k` fits in the grid
only while all four corners are inside; growing past that stops the loop
for that center. The border consists of four straight edges of `k` steps
each (top-to-left, left-to-bottom, bottom-to-right, right-to-top), so
each rhombus sum is computed in `O(k)` with corners counted exactly
once. Area-0 rhombuses (`k = 0`) contribute the single center cell.
Collect every distinct sum in a set, then output the three largest.

The number of rhombuses is `O(m * n * min(m, n))` and each border costs
`O(k)`, giving roughly 50 * 50 * 50 * 50 = 6.25M cell visits worst case —
well within limits. Sums are bounded by 2500 cells times `10^5 = 2.5 *
10^8`, which fits in 32 bits but is carried in 64-bit integers for
headroom.

**Complexity:** `O(m * n * min(m, n)^2)` time, `O(s)` space for the
distinct-sum set.

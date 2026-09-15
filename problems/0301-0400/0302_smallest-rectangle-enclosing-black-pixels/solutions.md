# Solutions — Smallest Rectangle Enclosing Black Pixels

## Binary search on the four bounds

The connectedness guarantee is what makes the sub-`O(mn)` algorithm possible:
a connected region's projection onto an axis is a contiguous range, because
any path from a pixel in its topmost row to one in its bottommost row passes
through every row between them, and likewise for columns. So "does row `r`
hold a black pixel" is a predicate that is true exactly for rows
`top..bottom` and false outside — a boundary that flips once, which binary
search locates.

Each bound is found by bisecting outward from the known black pixel `(x, y)`:
`[0, x]` for the first black row, `[x, m-1]` for the last, and the same pair
of searches over columns with `y`. The line through `(x, y)` is itself black,
so every window the search probes still brackets the boundary it seeks, and
the four results `top`, `bottom`, `left`, `right` are exactly the edges of
the smallest enclosing rectangle, whose area is
`(bottom - top + 1) * (right - left + 1)`.

A row probe scans that row's `n` cells and a column probe scans `m`, and each
bound needs only a logarithmic number of probes, so the whole method runs in
`O(m log n + n log m)` — below the mandated `O(mn)` by the margin that
`log n` stays far under `n`. No traversal is ever run and nothing is marked
visited; the bounds fall out of the geometry alone.

**Complexity:** `O(m log n + n log m)` time, `O(1)` space.

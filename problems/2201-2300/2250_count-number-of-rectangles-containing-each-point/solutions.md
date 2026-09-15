# Solutions — Count Number of Rectangles Containing Each Point

## Group by height, then binary search

A point `(x, y)` is contained by exactly the rectangles with `length >= x` and
`height >= y`, so the question reduces to counting rectangles in that
two-dimensional dominance region. The height axis is tiny — rectangles only
reach `100` — so the whole set can be bucketed by height once, and each point
then inspects only the `100` height buckets from `y` upward. Within one bucket,
all rectangles share a height, so the containment test collapses to
`length >= x`, and the count of qualifying rectangles is found with a binary
search over a sorted list.

The code first walks `rectangles` once, appending every length into the bucket
of its height, and sorts each bucket's lengths. For every point it then loops
`h` from `y` to `100`, looking up how many lengths in bucket `h` are at least
`x` and adding those counts. Because a bucket holds only rectangles of that
exact height, this counts precisely the rectangles whose height covers `y` and
whose length covers `x` — no rectangle is double-counted, and edge-on-boundary
points (`x == l`, `y == h`) are included by the `>=` comparisons.

The workload is dominated by the `100` binary searches per point. With
`rectangles.length` and `points.length` both up to `5·10⁴`, that stays well
inside the limits; the per-height buckets never re-scan the full rectangle
list for a point the way a brute-force `O(R·P)` scan would.

**Complexity:** `O(R log R + 100·P log R)` time, `O(R)` space.

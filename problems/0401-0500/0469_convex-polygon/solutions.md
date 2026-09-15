# Solutions — Convex Polygon

## Cross-product sign walk

A convex polygon turns the same way at every vertex. Walking the points in
order, each vertex sees an incoming edge `points[i] - points[i-1]` and an
outgoing edge `points[i+1] - points[i]`, and the z-component of their cross
product gives the turn's exact direction: positive for a left turn, negative
for a right one. The polygon is convex precisely when every non-zero turn
points the same way, so the code keeps one boolean per direction and answers
`false` the moment both have fired; indices wrap around modulo `n` so the
final turn, from the closing edge back to the first, is examined too.

A zero cross product is not a turn at all — it says three consecutive
vertices are collinear, which a simple polygon may legally do along an edge
(a square with the midpoint of one side listed as a vertex is still a
square). Zeros are simply skipped: they vote for neither direction, and a
polygon whose every vertex is collinear cannot be simple, so the walk always
sees at least one real turn.

Everything stays on integers. Coordinates are bounded by `10⁴`, so each edge
component is at most `2 * 10⁴` and a full cross product at most
`8 * 10⁸` — exact in 64-bit arithmetic (and inside float's integer range for
JavaScript), with no square root or division ever giving floating point the
chance to round a shallow turn into the wrong sign.

**Complexity:** `O(n)` time, `O(1)` space.

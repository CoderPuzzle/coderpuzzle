# Solutions — Rectangle Overlap

The whole question is whether the intersection has positive area, and area
factors into a width test and a height test that can be decided independently,
one axis at a time.

## Two projections, four strict inequalities

The intersection is a rectangle whenever it exists, so it has positive area
exactly when it has positive width and positive height at the same time. On
the x-axis the shared span runs from `max(rec1[0], rec2[0])` to
`min(rec1[2], rec2[2])`; that span is positive exactly when each rectangle's
left edge lies strictly left of the other's right edge, which unfolds the
`max`/`min` into the comparisons `rec1[0] < rec2[2]` and
`rec2[0] < rec1[2]`. The y-axis repeats the same story with the bottom and top
edges, giving `rec1[1] < rec2[3]` and `rec2[1] < rec1[3]`. Conjoined, the
four comparisons are the answer; read through De Morgan, they say the
rectangles fail to overlap exactly when one is wholly to the left, right,
above, or below the other — the two ways a projection can come up empty.

The comparisons are strict on purpose, and that is where the whole statement
hides. When `rec1[0] == rec2[2]` the shared span has width zero — the
rectangles merely share a vertical edge, and sharing an edge or a corner is
explicitly not an overlap. The strict form gets edge-touching, corner-touching
(both axes degenerate at once), and true separation right in a single
expression. And since the code only ever compares coordinates, it never
subtracts them, so coordinates at the `-10⁹`/`10⁹` bounds cannot overflow.

**Complexity:** `O(1)` time, `O(1)` space.

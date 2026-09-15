# Solutions — Rectangles Area

## Self join, absolute differences, three-key sort

Each candidate rectangle is an unordered pair of points, and the output
wants each pair once with the smaller id as `p1` — exactly what a self
join with `a.id < b.id` produces, with no deduplication pass needed.

The area of the axis-aligned rectangle whose opposite corners are the two
points is the product of the coordinate differences' absolute values:
`ABS(a.x_value - b.x_value) * ABS(a.y_value - b.y_value)`. A rectangle
with zero area is a degenerate pair sharing an x or a y; filtering on the
product being non-zero drops both cases in one predicate.

The final `ORDER BY area DESC, p1 ASC, p2 ASC` matches the three-key tie
contract. Nothing aggregates, so the result's cardinality is simply the
number of surviving pairs, and the quadratic self join is well within
bounds for the seeded tables.

**Complexity:** `O(P²)` pair generation plus a sort of the surviving
rows, `O(P²)` space.

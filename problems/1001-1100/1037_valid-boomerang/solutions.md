# Solutions — Valid Boomerang

## Cross product of the two edge vectors

Three points `p1`, `p2`, `p3` form a boomerang exactly when the triangle
they span has non-zero area, which is exactly when the edge vectors
`p2 - p1` and `p3 - p1` are not parallel. The cross product
`(p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)` is zero
precisely when the two vectors are parallel — including the case where
either vector is the zero vector — so a single `!= 0` test on that cross
product answers the whole question.

That one check also absorbs the "all distinct" half of the requirement for
free: if any two of the three points coincide, one of the two edge vectors
is the zero vector, and the cross product of anything with the zero vector
is `0`. Duplicate points therefore always fail the `!= 0` test without any
separate distinctness check. Coordinates are bounded by `100` in magnitude,
so every product in the cross-product expression is at most `100 * 100 =
10,000` and the whole expression never exceeds about `20,000` in
magnitude — well inside 32-bit range — but the arithmetic below still
widens to 64 bits before multiplying so it stays exact even if the
coordinate bound were ever raised.

**Complexity:** `O(1)` time, `O(1)` space.

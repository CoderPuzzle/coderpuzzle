# Solutions — Find Maximum Area of a Triangle

## Per-line span against global extremes

Twice the area of a triangle with an axis-parallel side factors cleanly:
`2 * area = base * height`, where the base lies on one horizontal or
vertical line and the height is the apex's perpendicular distance from
that line. Group the points by `y` and by `x`. On a horizontal line the
widest possible base is the span between the line's minimum and maximum
`x` — wider bases only help, and any two points of the line realize it —
and the tallest apex for that base is the point with the global maximum
or minimum `y`, whichever is not on the line itself (an apex on the
line would make the area zero). Every horizontal line therefore
contributes exactly two candidates, `x-span * (y_max - y)` and
`x-span * (y - y_min)`, each taken only when the corresponding extreme
is off the line. Vertical lines contribute the mirrored two. A triangle
whose axis-parallel side is vertical but which also has a horizontal
side (a right triangle) is counted by the horizontal branch as well, so
the two sweeps together cover every valid triangle; if no line ever
holds two points, no axis-parallel side exists and the answer is `-1`.

With all points grouped once, each line costs `O(1)` beyond the global
extrema, giving linear time overall and a single hash map per axis.
Products reach `(10⁶ - 1) * (10⁶ - 1) < 10¹²` for `2 * area`, which
exceeds the 32-bit range, so the arithmetic runs in 64-bit integers
(exact in JavaScript's `Number` too, since `10¹² < 2⁵³`).

**Complexity:** `O(n)` time, `O(n)` space.

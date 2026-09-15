# Solutions — Count Number of Trapezoids II

## Slope buckets with line splitting and a parallelogram correction

Every candidate trapezoid is determined by its two parallel bases, so the
count is organized around segments. Each of the `C(n, 2)` segments is
hashed by its reduced slope — `(dy, dx)` divided by their GCD with the
sign fixed so `(1, 2)` and `(-1, -2)` collide — and, within a slope
bucket, by the line it lies on (the constant cross product
`dx * y - dy * x`). Two same-slope segments on _different_ parallel lines
can never share an endpoint (the lines are disjoint) and always span a
convex quadrilateral, so per slope the valid base-pairs are simply
`C(m, 2)` over the whole bucket minus the `C(c, 2)` sums within each
line, which remove the degenerate collinear pairs the shared-endpoint
rule would otherwise miss.

What remains is double counting: a quadrilateral with _two_ pairs of
parallel sides — a parallelogram — appears once in each of its two slope
buckets. Parallelograms are counted independently by their diagonals: a
quadrilateral is a parallelogram exactly when its two diagonal segments
share a midpoint, so segments are hashed by `(x1 + x2, y1 + y2)` and each
same-midpoint pair with _different_ slopes contributes one. Equal slopes
are excluded because that means all four points are collinear — a flat
"parallelogram" that was never counted in the slope buckets. Subtracting
this count once makes every convex quadrilateral with at least one
parallel pair contribute exactly one. All bucket sums stay below
`C(125000, 2) ≈ 7.8 × 10⁹`, which overflows 32 bits, so the running
totals are 64-bit while every per-segment key fits comfortably in 32.

**Complexity:** `O(n²)` time, `O(n²)` space.

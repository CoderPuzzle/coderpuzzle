# Solutions — Largest Triangle Area

## Brute force over all triples

Every triangle is three of the points, and at most `50` points mean at most
`C(50, 3) = 19,600` triples — few enough to simply enumerate them all with
three nested loops over index triples `i < j < k` and keep the largest area
found. Nothing in the statement rewards doing better: the bound is small and
fixed, so the direct search is the whole algorithm.

The area of the triangle through `a`, `b` and `c` is half the absolute value
of the cross product of the edge vectors `b - a` and `c - a`. Computing that
cross product in 64-bit integers keeps the arithmetic exact — coordinates are
at most `50` in magnitude, so every product is tiny — and the single division
by `2` at the end halves an exact integer by a power of two, so the returned
double is exact. A degenerate triple (three collinear points) has cross
product `0` and contributes area `0`, which never beats the running best, so
it needs no special case; if every triple is degenerate the answer stays
`0.0`, exactly as the problem demands.

**Complexity:** `O(n³)` time, `O(1)` space.

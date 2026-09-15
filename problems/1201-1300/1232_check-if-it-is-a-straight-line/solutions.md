# Solutions — Check If It Is a Straight Line

## One cross product against the first two points

Fix the direction from the first point to the second — every other point must
lie on that line. The slope test `dy/dx` divides, and a vertical line has no
slope at all, so the check is rearranged into the cross product:
`(x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)`, which is zero exactly when the
vector from point 1 to `(x, y)` is parallel to the vector from point 1 to
point 2 — vertical lines included, division nowhere.

Coordinates are bounded by `10⁴`, so each product stays under `2 * 10⁸` and
the difference under `4 * 10⁸`; the products are computed in 64-bit anyway so
no overflow can approach. Two points trivially form a line and the same loop
simply has nothing left to check.

**Complexity:** `O(n)` time, `O(1)` space.

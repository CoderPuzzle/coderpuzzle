# Solutions — Separate Squares II

## Y-Sweep with a Covered-Interval Segment Tree

With overlaps counted once, the covered area below height `y` is the integral of the horizontal width of the union of active squares' x-intervals. That width only changes at square bottoms and tops, so sweep the `2n` y-events in order: apply every add/remove at the current height, and between two consecutive event heights the union width is constant, contributing `width * (y_next - y)` to the total. This decomposes the region into horizontal bands, each with an exact integer area.

The union width is maintained by a segment tree over the compressed x-coordinates of all square edges. Each node stores `count` (how many active intervals fully cover the node's span) and `cover` (the covered length within it): a node is fully covered when `count > 0`, a leaf is zero otherwise, and interior nodes fall back to the sum of children. Because `count` is updated only on fully covered nodes and never cleared below them, no lazy propagation is needed — each square add/remove is a single `O(log n)` range update, and the root's `cover` is the current union width.

A first pass records every positive-width band `(y0, y1, width)` together with the exact area accumulated before it, and the total covered area. A second pass finds the first band where the running area reaches half the total; inside that band the area below a line at `y` is `area + width * (y - y0)`, so the balance point solves `width * (y - y0) = total/2 - area`. Stated with integers as `y = y0 + (total - 2 * area) / (2 * width)`, only this final division touches floating point, which keeps the `10^-5` tolerance easily satisfied for totals up to `10^15`.

Edge cases: squares fully nested inside others (the inner square's events add and remove coverage without ever changing the width, as in example 2), coincident edges handled by coordinate compression and grouped event application, and identical y-values across events processed together before measuring the band.

**Complexity:** `O(n log n)` time, `O(n)` space.

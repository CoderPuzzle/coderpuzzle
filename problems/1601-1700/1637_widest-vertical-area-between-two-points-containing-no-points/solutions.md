# Solutions — Widest Vertical Area Between Two Points Containing No Points

## Sort the x-coordinates

The y-coordinates never matter: a vertical area spans every height, so a
point only blocks a strip if its x-coordinate falls inside it. That reduces
the problem to one dimension — find the widest gap between consecutive
values once the x-coordinates are sorted.

The code extracts `points[i][0]` for every point, sorts the resulting list,
and walks adjacent pairs, tracking the largest difference. Duplicate
x-coordinates simply contribute a gap of zero and never win, which handles
the case where several points share a column without any special-casing.

**Complexity:** `O(n log n)` time, `O(n)` space.

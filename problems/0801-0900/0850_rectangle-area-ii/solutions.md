# Solutions — Rectangle Area II

## Coordinate compression grid

Coordinates run up to `10^9` but there are at most 200 rectangles, hence at most 400 distinct x values and 400 distinct y values. Collecting and sorting those unique coordinates compresses the plane into a coarse grid whose cell boundaries are exactly the rectangle edges: no rectangle boundary ever cuts through the interior of a compressed cell, so coverage is constant on each cell and the union's area is the sum of the real areas of the covered cells.

Index maps translate each rectangle's corners into grid coordinates, and a boolean grid marks every cell in the half-open compressed range `[xi1, xi2) x [yi1, yi2)` — half-open so adjacent rectangles sharing an edge mark cells without overlap or gaps. Marking is idempotent, which is precisely how overlaps are counted once: a cell covered by five rectangles is still just `True`.

A final sweep adds up `(xs[i+1] - xs[i]) * (ys[j+1] - ys[j])` for every marked cell, taking the modulus at each addition so the total never grows beyond the prime's square. The degenerate pieces of the boundaries (single points, zero-width strips) contribute nothing, matching the exact-union semantics required.

**Complexity:** `O(R · u · v)` time, `O(u · v)` space, for `R` rectangles with `u` distinct x and `v` distinct y coordinates (`u, v <= 2R`).

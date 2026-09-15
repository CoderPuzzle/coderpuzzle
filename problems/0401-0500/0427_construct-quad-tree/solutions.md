# Solutions — Construct Quad Tree

## Divide and conquer on uniform quadrants

Recursively process one square region: scan its cells, and if they all
share one value, emit a leaf carrying that value. Otherwise split the
square into its four equal quadrants, attach four recursive children to an
internal node, and return it. The top-level call covers the whole `n * n`
grid, and since `n` is a power of two every split lands exactly on cell
boundaries, terminating at 1×1 squares that are uniform by definition.

A uniform check costs one pass over the region's cells, so the worst case
(a checkerboard, which splits at every level) does `O(n^2)` work per level
over `O(log n)` levels. Depth is at most 7 for the constraint's `n <= 64`,
far under any stack limit.

**Complexity:** `O(n^2 log n)` time, `O(n^2)` space for the tree in the
worst case.

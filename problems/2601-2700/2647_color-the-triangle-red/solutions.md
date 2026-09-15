# Solutions — Color the Triangle Red

## Four-Row Construction

The construction follows the hint's "four rows at a time, going bottom
up" shape directly. Rows are grouped into bands of four counted from the
bottom; whatever remains at the top (`n % 4` rows, the tip) is seeded on
its own. The tip always seeds the apex `(1,1)` plus the left and right
corners of each further tip row. Every full band then receives four kinds
of seeds: one triangle at its top row's left edge, every odd column of its
second row except that leftmost spot (columns `3, 5, …, 2i+1`), a single
column-2 triangle in its third row, and every odd column — `1, 3, 5, …` —
of its bottom row.

Why this floods: a down-pointing triangle flanked horizontally by two red
up-pointing neighbors reaches the two-neighbor threshold immediately, and
each band's pattern guarantees exactly such pairs in a chain across the
band while its odd-column rows simultaneously hand enough red neighbors to
the band above and below through their shared sides. Since the bands tile
the whole triangle, threshold-2 propagation never stalls until everything
is red. The seed count works out in closed form: `t = n mod 4` contributes
`2t − 1` tip seeds when nonzero, and each complete band starting at row
`s` costs `2s + 5`, summing to `4c² + c·(2t + 3)` over the
`c = (n − t)/4` bands — about one quarter of the `n²` unit triangles.
An exhaustive enumeration of all smaller candidate seed sets confirms
that nothing strictly smaller can flood any triangle of side length five
or less, matching the monovariant lower bound the first hint points at.

Emitting the coordinates is pure bookkeeping: one pass over the bands,
constant work per emitted cell, output ordered top-down by row so the list
matches the examples' presentation without sorting.

**Complexity:** `O(n²)` time and space.

# Solutions — Detect Squares

## Point frequencies and horizontal partners

Store the frequency of every added coordinate so duplicate points remain
distinct choices. For a query `(x, y)`, each stored point `(x2, y)` with
`x2 != x` fixes one horizontal side and its positive length
`d = abs(x2 - x)`. The other two corners must then be `(x, y + d)` and
`(x2, y + d)`, or their corresponding points at `y - d`.

For each orientation, multiply the frequencies of all three stored corners;
the product counts every independent choice of duplicate points. Summing those
products over distinct stored horizontal partners counts each positive-area
axis-aligned square once, while absent-corner lookups contribute zero.

**Complexity:** `O(1)` average time per `add`, `O(p)` time per `count`, and `O(p)` space, where `p` is the number of distinct stored points.

# Solutions — Surrounded Regions

Both readings turn the question inside out. Enclosure is a property of a
whole region rather than of any cell in it, but the regions that survive
are exactly the ones touching the border — so the real job is to name the
border-connected `'O'`s and capture everything else. The flood fill
answers by walking: it seeds every `'O'` on the four edges and spreads
outward, stamping what it reaches. The union-find answers by encoding:
each `'O'` merges with its `'O'` neighbours and each border `'O'` merges
with one virtual node standing for the outside, after which a single root
comparison per cell settles the whole board at once.

## Border-seeded flood fill (reverse capture)

Enclosure is awkward to test cell by cell, because a region's fate is a property of the whole region, not of any single cell. Invert the question and it becomes easy: a region keeps its `'O'`s exactly when at least one of its cells sits on the border, so the survivors are precisely the cells reachable from some border `'O'` through orthogonal `'O'` steps — and every other `'O'` is enclosed by definition. Capturing then needs no region detection at all.

The method seeds a stack with every `'O'` on the four edges and flood-fills, stamping each reached cell `'#'` as it is discovered. The stamp doubles as the visited flag, and neither `'X'` nor `'O'` can collide with it. The fill runs on an explicit stack rather than recursion because a safe region can span all forty thousand cells of a `200 x 200` board, deeper than a call stack allows. One closing sweep reverts `'#'` to `'O'` and turns every remaining `'O'` into `'X'` — that leftover set is exactly the surrounded regions, so no second pass or extra bookkeeping is needed.

Edge shapes fall out of the seeding alone: a single row or column, an all-`'O'` board, and Example 1's bottom-edge `'O'` are nothing but border-connected cells, so nothing is captured. The rewrite happens inside the input allocation; the method returns the same `board` it received, now captured, which is what the judge compares.

**Complexity:** `O(mn)` time, `O(mn)` space in the worst case (the stack).

## Union-find with a virtual border node

Regions can be built rather than walked. Give every cell a disjoint-set
node — `i * n + j` for row `i`, column `j` — and add one extra node,
`m * n`, standing for the outside of the grid. A single sweep encodes the
whole picture: each `'O'` unions with its right and lower neighbours when
those are `'O'` too, which offers every orthogonal `'O'` pair to the union
exactly once, and each `'O'` sitting on an edge unions with the virtual
node.

The virtual node is what makes the encoding sharp. "Reaches any of the
four borders" is four separate conditions on a region, and a region that
satisfies one of them may only do so through a cell far from the one being
inspected; gluing every border `'O'` to the same node collapses all of
that into one membership test. After the sweep, a region's set contains
the virtual node exactly when some cell of it lies on an edge, so
`find(cell) != find(outside)` is precisely the statement that the cell is
enclosed.

The parent array uses path halving — `parent[x] = parent[parent[x]]`
splices every other node on a root walk under its grandparent — so the
merges and lookups cost inverse-Ackermann amortized time and the two
sweeps stay linear in the cell count. No merge remains once the encoding
sweep ends, which is why the virtual node's root is read once, before the
capture sweep, and reused for every comparison. Degenerate shapes need no
special case: on a single row or column every cell is a border cell and
joins the virtual node, and Example 1's lone bottom-edge `'O'` is glued to
it directly, so neither is captured. Only the cells whose set never
reached an edge flip, and the rewritten `board` is returned as it stands.

**Complexity:** `O(mn · α(mn))` time, `O(mn)` space for the parent array.

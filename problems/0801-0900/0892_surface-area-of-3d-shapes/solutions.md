# Solutions — Surface Area of 3D Shapes

The glued shapes are irregular, but every exposed face still belongs to one
tower, so the area assembles tower by tower: a tower of height `v > 0`
always shows its top and bottom face, and on each of its four sides it shows
exactly the strip of wall that rises above whatever stands on the
neighboring cell. One sweep that banks those pieces counts every exposed
face exactly once and never has to look at a shape as a whole.

## Count each tower's exposed faces

An occupied cell contributes `2` horizontal faces — the note in the
statement puts the bottom face on the same footing as the top. For the
vertical walls, adjacency is what hides area: when towers of heights `v` and
`h` stand on neighboring cells, the shared wall buries `min(v, h)` units on
both sides, and only the taller tower shows anything — `max(0, v - h)`.
Charging that strip to the taller tower alone is what keeps every hidden
face subtracted exactly once; equal towers contribute nothing to each
other. An empty neighbor, or the open air just past the grid's edge, is
simply a tower of height `0` and exposes the full `v`.

The implementation is one double loop over the cells with a single running
scalar. A cell with `v > 0` banks its `2`, then probes its four orthogonal
neighbors through a fixed direction table, reading height `0` for anything
outside the grid; nothing is allocated beyond the table, and the diagonal
directions are never probed because diagonally touching cubes share no
face. A 32-bit integer is ample headroom: even the checkerboard of 50-high
towers, where nothing hides anything, totals 1250 × 202 = 252500, and the
50 x 50 grid of 50-high towers glued into one slab reaches only 15000.

The degenerate shapes fall out without special cases. An all-zero grid
never enters the `v > 0` branch and returns 0; a lone cube returns
`2 + 4 × 1 = 6`; and the uniform plateau of height `h` shows only its rim,
`2n² + 4nh`, exactly as the bottom-note accounting predicts.

**Complexity:** `O(n²)` time, `O(1)` space.

# Solutions — Regions Cut By Slashes

Every marking is a wall segment running between two corners of its
square, so a region is one connected piece of empty space once all the
walls are up — and counting regions is a connectivity question about a
layout the input only implies. The walls live below square resolution:
two open areas can meet around a corner as well as along an edge, so any
method has to raise the resolution before it can count. The direct way
is to redraw the board as a picture: blow each square up into a 3x3
block, paint the wall onto that block's diagonal, and flood fill the
pixels that stay open. The sharper way keeps no picture at all — quarter
every square into four triangles and let a union-find record which
quarters touch.

## Upscale each square 3x, then flood fill the open pixels

Redraw the board at triple resolution: square `(i, j)` becomes the 3x3
block of pixels rows `3i .. 3i + 2`, columns `3j .. 3j + 2`, and its
marking is painted as blocked pixels down one of the block's diagonals —
a `/` blocks `(3i, 3j + 2)`, `(3i + 1, 3j + 1)`, `(3i + 2, 3j)`, a `\`
blocks `(3i, 3j)`, `(3i + 1, 3j + 1)`, `(3i + 2, 3j + 2)`, and a blank
blocks nothing. Regions are then simply the connected components of the
open pixels under ordinary four-way adjacency, which an explicit-stack
flood fill counts: sweep the `3n x 3n` picture, and every time an open
pixel has not been seen yet, start a fill from it, mark everything it
reaches, and add one to the tally.

Three is the smallest scale that keeps the geometry honest. A wall must
separate the two halves of its own square, which one blocked pixel per
row of the block already achieves; but a wall must _not_ separate open
areas that merely touch at a shared corner of the board, and at scale 3
the pixel beside a diagonal's end is still open, so a path can slip
around the corner exactly as the statement allows. Scale 2 fails that
second test — the two blocked pixels of a `\` block would seal the
corner shut — and anything larger than 3 only costs more pixels. The
`9n²` pixels are each pushed and popped at most once, so the fill is
linear in the picture and the whole method runs in `O(n²)`.

**Complexity:** `O(n²)` time, `O(n²)` space.

## Quarter each square, then union every pair of triangles that touch

Give each square `(i, j)` four triangles — top, right, bottom, left —
stored at `4 * (i * n + j) + t`, each starting as its own set. A square's
marking says which of its own triangles join: a blank joins all four, a
`/` joins top with left and right with bottom, and a `\` joins top with
right and bottom with left. Across square borders the joins are forced by
geometry — the bottom triangle of `(i, j)` shares its whole open edge
with the top triangle of `(i + 1, j)`, and the right triangle of `(i, j)`
with the left triangle of `(i, j + 1)` — so union those pairs as well.
Union everything that touches, and each surviving set is exactly one
region; since roots are precisely the self-parented nodes, one sweep
counting `parent[x] == x` over all `4 * n * n` triangles returns the
answer.

The quartering is faithful at exactly the resolution the walls need: a
wall's endpoints are square corners, so two open areas can touch only
inside a square, along a shared edge, or around a corner — and each of
those contacts is a union between two named triangles, while any two
areas separated by a wall share none. The implementation never recurses:
`find` walks parent links up to the root and compresses the walked path
in a second loop, so no call stack grows with the grid, and the inverse
Ackermann growth of the union-find keeps the whole pass effectively
linear in the number of triangles.

**Complexity:** `O(n² α(n²))` time, `O(n²)` space.

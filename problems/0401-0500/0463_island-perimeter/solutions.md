# Solutions — Island Perimeter

## Count the boundary edges per cell

A land cell owns four unit edges of boundary. Whenever two land cells share a
horizontal or vertical side, two of those edges stop being perimeter — one on
each side of the shared border — because neither edge touches water there.
Diagonal contact shares no side and hides nothing. The perimeter is therefore
`4 × land cells − 2 × adjacent land pairs`, and a single sweep accumulates it
cell by cell: add 4 for each land cell, then subtract 2 for each of its up and
left neighbours that is also land. Looking only up and left visits every
adjacent pair exactly once — the later cell in row-major order charges the
pair — so each pair's two-edge cost is taken in one place.

The statement's guarantees are what let one plain sweep be the whole answer.
"Exactly one island" means every land cell the loop meets belongs to the same
island, so there are no separate components whose perimeters would need
finding and stitching. "No lakes" means the only water any land edge can face
is the sea surrounding the grid, so every counted edge lies on the one outer
outline and nothing interior is missed.

At the constraint ceiling the grid is at most `100 x 100`, and even the
all-land extreme keeps the answer at `400`, so the count fits comfortably in a
32-bit integer.

**Complexity:** `O(mn)` time, `O(1)` space.

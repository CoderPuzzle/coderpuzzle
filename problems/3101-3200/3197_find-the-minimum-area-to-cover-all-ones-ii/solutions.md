# Solutions — Find the Minimum Area to Cover All Ones II

## Rotate-and-peel rectangle decomposition

Two axis-aligned rectangles that do not overlap can never interleave: if
their column ranges intersect then their row ranges cannot, so a full-width
or full-height line always separates them. Applied pairwise, that means any
valid three-rectangle cover is recoverable hierarchically — peel away the
rectangle that sits on one side, then split what remains between the other
two with one more straight cut. The enumeration therefore peels every
possible band over all four rotations of the grid, covers each peeled
band's ones with their tight bounding box, and splits the remainder into
two tight boxes at every internal horizontal or vertical cut.

![On grid = [[1,0,1],[1,1,1]], one rotation peels the left column band into a 2-area box and splits the remainder by a horizontal cut into the tight 1-area box over (0,2) and a 2-area box on row 1, summing to 5.](figures/solution-rotate-peel-decomposition.svg)

One subtlety costs correctness if skipped: a peeled band's covering
rectangle spans only the rows that actually contain ones inside its span,
not the raw strip — an empty row shrinks the real box. The code keeps all
four extremes per side and rebuilds prefix/suffix accumulators incrementally,
so each candidate is just two multiplications once the sweeps are in place.
The three boxes only need non-zero area on sides that hold ones; the input's
guarantee of at least three 1's means a valid partition always exists.

With `m, n <= 30` the whole search touches well under a million cell views,
so it runs in linear-in-area time per rotation. Area sums stay far below
32 bits (`3 * 900`).

**Complexity:** `O(mn(m + n))` time, `O(n)` space.

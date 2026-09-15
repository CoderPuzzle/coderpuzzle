# Solutions — Projection Area of 3D Shapes

## Three shadows, three independent sums

The three projections never interact, so the answer splits into three
independent sums over the same grid. The top view is a footprint: a cell
casts a unit of shadow exactly when its tower has at least one cube, so the
first sum counts the nonzero cells. The other two views are silhouettes —
looking edge-on, towers hide behind towers — so a row contributes only its
tallest tower to one view and a column only its tallest to the other. The
total is the count of nonzero cells plus the sum of the row maxima plus the
sum of the column maxima, and no other property of the heights matters.

Both sweeps walk the grid cell by cell with nothing but a running scalar.
The first pass goes row by row: it counts every nonzero value it meets and
tracks the current row's maximum in a single variable, banking that maximum
when the row ends. The second pass collects the column maxima the same way,
scanning each column top to bottom for its tallest tower. Neither pass
remembers anything between iterations beyond its current maximum, so no
auxiliary array is ever allocated — the grid itself is the only structure
the algorithm touches.

The degenerate shapes need no special casing anywhere. An all-zero grid
banks a maximum of 0 for every row and column and counts no footprint, so
it returns 0; a single cell returns `3v` for height `v`; and the largest
legal input, a 50 x 50 grid of 50-tall towers, stays far inside every
bound at `2500 + 2500 + 2500`.

**Complexity:** `O(n²)` time, `O(1)` space.

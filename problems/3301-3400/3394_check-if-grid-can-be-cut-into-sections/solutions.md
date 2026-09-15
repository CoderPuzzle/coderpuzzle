# Solutions — Check if Grid can be Cut into Sections

## Sort projections and count gaps

A cut across the grid is legal for one axis exactly when no rectangle
straddles it, so the two-dimensional question collapses onto the
projections: two cuts split the rectangles along an axis exactly when
that axis's `[startx, endx]` (or y) intervals fall into three or more
groups, each group landing in one section. Since the rectangles never
overlap, a cut may also run along a shared rectangle edge, which means
touching intervals count as separate groups — the cut slides between
two rectangles that merely touch.

Each axis is then a single sweep. Sort the projections by start, keep
the running furthest end, and count how many times the next start
reaches it; every such moment is one gap that a cut can pass through,
and the axis works as soon as two gaps appear. Trying the x-axis and
then the y-axis answers the question. The grid size `n` never enters
the computation — only the relative order of rectangle edges matters.

**Complexity:** `O(m log m)` time, `O(m)` space for the projection
lists, where `m` is the number of rectangles.

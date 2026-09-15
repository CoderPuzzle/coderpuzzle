# Solutions — Minimum Number of Days to Disconnect Island

## Try zero, then one, then default to two

Count the island's connected components with a flood fill. If the count is
already anything other than one — zero because the grid is all water, or two
or more separate landmasses — the grid is already disconnected and the
answer is `0`. Otherwise, try turning each land cell to water one at a time,
restoring it before trying the next, and re-run the flood fill on each
attempt; the first cell whose removal breaks the single island into zero or
several pieces gives an answer of `1` — that cell is an articulation point of
the island's grid graph. If no single cell works, the answer is `2`, with no
need to search which pair of cells achieves it.

The `2` case never needs to be searched for because it is always
achievable, a fact specific to 4-directionally connected grid islands rather
than general graphs. Take the land cell that is first in row-major order —
topmost row, then leftmost column within that row. By that choice its
neighbors above and to its left are never land, so it has at most two land
neighbors, to its right and below. If it had exactly one such neighbor, that
neighbor would be an articulation point (removing it would strand this
leaf cell alone), which the exhausted `1`-day search already ruled out; so
once no single cell disconnects the island, this extremal cell must have
exactly two land neighbors and no others. Turning those two neighbors to
water leaves the extremal cell with no land neighbor left at all, isolating
it as its own island and disconnecting the grid — so two days always
suffice once one day has been shown not to.

**Complexity:** `O((r*c)^2)` time — one flood fill costs `O(r*c)`, and up to
`r*c` land cells are each tried once. `O(r*c)` space for the visited
markers.

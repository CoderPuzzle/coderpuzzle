# Solutions — Number of Ways to Build Sturdy Brick Wall

## Joint-mask DP over rows

A row's internal structure is exactly its set of joints (positions where
two bricks meet before the far end), so with `width <= 10` every row is
one bitmask of at most 9 bits. Enumerating all masks by laying bricks
from left to right gives at most a few dozen distinct rows. Two adjacent
rows are compatible precisely when their joint masks are disjoint, and
the wall count becomes: sum over sequences of `height` masks with
adjacent pairs disjoint — a per-row DP that carries one count per mask
and transitions by pairwise disjointness.

**Complexity:** `O(R^2 * height)` time for `R` row masks (`R <= ~2^9`
worst case but tiny in practice), `O(R)` space.

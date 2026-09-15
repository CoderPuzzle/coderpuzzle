# Solutions — Minimum Knight Moves

## Breadth-First Search on a Folded Window

Two symmetries shrink the search space before any search runs. The
knight's moves are mirror-symmetric across both axes, so a target at
`(x, y)` takes exactly as many steps as the target `(|x|, |y|)` — every
target folds into the first quadrant. And a knight never needs to stray
far outside the rectangle spanned by the folded target: overshooting by
more than two squares always wastes a move, so the board can be clipped
to the window `[-2, |x| + 2] × [-2, |y| + 2]` without losing any optimal
path.

Within that window a layered breadth-first search from the origin is
exactly shortest-path: cells are visited in nondecreasing step count, so
the first time the target leaves the queue its depth is the answer. The
window holds `O((|x| + |y|)²)` cells and each is entered once with 8 move
candidates, giving linear-in-area work — comfortably inside limits for
`|x| + |y| <= 300`.

**Complexity:** `O((|x| + |y|)²)` time — each of the window's cells is
expanded once over 8 neighbours — and `O((|x| + |y|)²)` space for the
visited set.

# Solutions — Squirrel Simulation

## Round trips plus one detour

Once the first nut has been delivered, the squirrel starts and ends every
trip at the tree, so each remaining nut costs a fixed tree → nut → tree
round trip of `2 * dist(nut, tree)` no matter what order they are collected
in. Those round trips are the unavoidable bulk of the answer, and the only
decision with any effect is which nut is picked up first.

Starting with nut `i` replaces that nut's round trip by a squirrel → nut →
tree walk, changing the total by `dist(squirrel, nut_i) - dist(nut_i, tree)`
— a change that can even be negative, when the squirrel starts closer to
the nut than the tree is. So the answer is `2 * Σ dist(nut, tree)` plus the
minimum such change, which is why the nearest nut is not automatically the
right first pick: what matters is the difference between the two distances,
not proximity alone.

![On Example 1's garden both nuts cost a fixed 2 × 3 = 6 round trip from the tree, and the first-leg changes are 5 − 3 = +2 for nut [3,0] versus 3 − 3 = 0 for nut [2,5], so the squirrel starts with [2,5] for the minimum total 12.](figures/solution-round-trip-detour.svg)

One pass over `nuts` accumulates the round trips and tracks the smallest
change; `height` and `width` never enter, since the coordinates alone
determine every Manhattan distance.

**Complexity:** `O(n)` time, `O(1)` space.

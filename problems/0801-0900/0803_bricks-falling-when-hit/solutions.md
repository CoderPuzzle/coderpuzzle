# Solutions — Bricks Falling When Hit

## Reverse-time replay with union-find

Simulating erasures forward is painful because each removal can cascade a falling cluster, and those removals are hard to undo. Reverse the timeline instead: first apply all hits to a copy of the grid, then union every surviving brick with its right and down neighbors, and union the entire top row with a virtual "top" node (index `m * n`). Union-find with union-by-size then answers, in near-constant time, how many bricks belong to the top-connected — that is, stable — component. The virtual node's size is seeded to 0 so component sizes count bricks only.

Replay the hits backwards. For each hit in reverse order, record the top component's size before doing anything. If the original grid had no brick at that cell, the hit is a no-op and contributes 0. Otherwise restore the brick, union it with the virtual top if it sits in row 0, and union it with each of its four neighbors that currently exist. The bricks that this erasure had knocked loose are exactly those newly connected to the top, so the hit's fall count is the after-size minus the before-size minus one (the restored brick itself); clamping at 0 covers the case where the restored brick connects nothing new.

The equivalence holds because connectivity in the final-minus-one-erasure grid matches stability after all later erasures have already been applied — reversing time turns "which bricks fall" into "which bricks regain a path to the top." Each hit does at most five union/find operations, and path halving keeps those nearly constant.

Example 1 replays its single hit backwards:

1. Apply all hits first: the replay grid is `[[1,0,0,0],[0,1,1,0]]`, whose top-connected component is just `(0,0)` — size 1.
2. Record `before = 1`, then restore the brick at `(1,0)`.
3. Unioning the restored brick with its neighbors `(0,0)` and `(1,1)` (and onward to `(1,2)`) grows the top component to size 4.
4. The hit's fall count is `4 - 1 - 1 = 2` — exactly the two bricks the statement shows dropping.

**Complexity:** `O((mn + H) * alpha(mn))` time for `H` hits on an `m x n` grid, `O(mn)` space.

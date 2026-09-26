# Solutions — Maximum Number of Moves in a Grid

## Reachable-rows frontier sweep

Every move advances exactly one column, so a path's move count is simply
the index of the farthest column it reaches. Which row you would land on
in a later column only depends on which rows were reachable in the
previous one, so a single boolean array of size m can carry the whole
state: it starts all-true (any first-column cell is a valid start), and
each step computes the rows reachable in the next column by testing the
three neighbors of every reachable row for a strictly larger value.

If a step produces no reachable row the sweep stops early — no start can
push past that column — otherwise the move count grows by one and the new
array becomes the frontier. The answer is the accumulated count, which is
at most n - 1.

![On the example grid [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]] the reachable-row frontier starts all-true, narrows to rows 1 and 3 in column 2 and then rows 2 and 3 in column 3 — its depth climbs 1, 2, 3 and the answer is 3, reached for instance by 2 → 4 → 9 → 11.](figures/solution-frontier-sweep-depth.svg)

**Complexity:** `O(m * n)` time, `O(m)` space.

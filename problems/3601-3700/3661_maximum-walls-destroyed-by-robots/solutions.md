# Solutions — Maximum Walls Destroyed by Robots

## Neighbor-clipped intervals with a direction sweep

Each robot really has only two shots to choose from, and neither can cross a
neighbor. Sort the robots by position (carrying each bullet's range along)
and sort the walls once. Firing left, the bullet dies at the previous robot,
so the reachable walls are exactly those in `[max(p - d, prev + 1), p]`;
firing right, it dies at the next one, giving `[p, min(p + d, next - 1)]`.
A wall sitting on a blocker's position survives everyone else's bullets —
only the blocker itself, whose own shot starts right on top of it, can
destroy it — while a robot's co-located wall falls to either of its own two
directions. Two binary searches over the sorted walls count any interval,
and an empty interval simply counts as zero.

The catch is that adjacent robots' facing shots overlap: everything in the
gap between them is reachable from both sides, and the answer counts
distinct walls. So sweep the robots left to right carrying two totals — the
best score so far when the previous robot fired left, and when it fired
right. A right-facing shot never collides with anything already decided:
the previous robot's leftward shot points away from the gap and its
rightward shot stops short of this robot. It just adds its interval's count
to the better of the two totals. A left-facing shot also adds its count,
but when the previous robot fired right, the walls shared by the two
intervals — those in `[max(p_i - d_i, p_{i-1} + 1), min(p_{i-1} + d_{i-1},
p_i - 1)]` — were already counted and must be subtracted back out. The
larger of the two final totals is the answer.

Both clamps degrade gracefully at the ends of the line (no neighbor means no
clip), single robots fall straight out of the base case, and the sweep never
needs anything but a running pair of totals.

**Complexity:** `O((n + m) log(n + m))` time, `O(n)` space.

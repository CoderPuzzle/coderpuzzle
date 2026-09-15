# Solutions — Set Intersection Size At Least Two

## Greedy by Right Endpoint

Sort the intervals by right endpoint ascending, breaking ties by larger start (the shorter interval first), and grow the chosen point set one interval at a time. Since endpoints never decrease, the chosen points stay in non-decreasing order; and because every chosen point is at most the current interval's right end, the chosen points lying inside any `[s, e]` are exactly a trailing run of the list — so checking whether the last two chosen points reach back to `s` tells you how many points already hit the interval.

When an interval is not yet satisfied, the points to add are the largest ones inside it: its right end `e`, or `e-1` and `e` when nothing yet covers it. The exchange argument is that later intervals all end at `e` or beyond, so of all points that serve the current interval, the largest have the best chance of also serving future intervals; any optimal solution can be rewritten to use them without growing. Three cases fall out: two points already inside — add nothing; one point inside — add `e`; none — add both `e-1` and `e`.

One pass over the sorted intervals suffices, with constant work per interval thanks to the trailing-run observation. The answer is the final length of the chosen list, at most two points per interval and usually far fewer.

**Complexity:** `O(m log m)` time, `O(m)` space.

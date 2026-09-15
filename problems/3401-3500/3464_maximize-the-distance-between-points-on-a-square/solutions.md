# Solutions — Maximize the Distance Between Points on a Square

## Perimeter Coordinates with Binary Search and Greedy Hops

For two points on the boundary of an axis-aligned square, the Manhattan distance equals the length of the shorter of the two boundary arcs between them. Mapping every point to its clockwise perimeter coordinate (bottom edge by `x`, right edge by `side + y`, top edge by `2*side + (side - x)`, left edge by `3*side + (side - y)`) turns each distance into `min(gap, 4*side - gap)` along a circle of circumference `4*side`. The answer is monotone under binary search on the required minimum distance `d` in `[0, 2*side]` (the diameter between opposite corners).

Checking a candidate `d` needs: can we pick `k` points around the circle, consecutive selections at least `d` apart in both directions? Sort the coordinates, duplicate the array with `+4*side` offsets to open the circle into a linear array, and precompute `nxt[j]` = the first index after `j` whose coordinate is at least `arr[j] + d` (one binary search per index). Then for each possible starting point `i`, hop `k - 1` times along `nxt`; the chain is valid when it stays within the window of `n` circular successors, and the final check `arr[cur] + d <= arr[i] + 4*side` verifies the wrap-around step back to the start also respects the gap, so the `k` selected points are pairwise separated in both arc directions.

The pairwise-guarantee argument is the crux: `k` points all pairwise `d`-apart in Manhattan on the boundary is equivalent to `k` points pairwise at least `d` apart along the circle in both directions, and the greedy hop chain starting from each `i` finds such a set whenever one exists with `i` as a member — trying every start covers all cases. Since `k <= 25` and the points are few, each check is `O(n * (k + log n))`.

Edge cases: `d = 0` is always feasible (short-circuited), points sitting exactly on corners belong to two edges but the perimeter map assigns each a single consistent coordinate, and duplicate coordinates make large `d` infeasible through the strict `arr[m2] < target` comparison in the successor search.

**Complexity:** `O(n * (k + log n) * log(side))` time, `O(n)` space.

# Solutions — Length of the Longest Increasing Path

## Split and binary-search the LIS

The pivot `coordinates[k]` cuts every candidate path into three pieces: a
strictly below-left prefix, the pivot itself, and a strictly above-right
suffix. This is because dominance is transitive — if a point precedes the
pivot it satisfies `x < xₖ` and `y < yₖ`, and anything the pivot precedes
satisfies both inequalities in the other direction. Points that share the
pivot's x or y, or sit in the two opposite quadrants, can never appear at
all: any path through them would need a step where x or y fails to grow.
So the answer is one plus the longest chain among the below-left points
plus the longest chain among the above-right points.

Each half is a longest increasing subsequence over 2D points: order the
points by x ascending, breaking ties by y **descending**, then find the
longest strictly increasing subsequence of the y values. The tie-break is
what makes equal x values unable to chain. Within an equal-x block the y
values decrease, so a strictly increasing scan takes at most one point per
block; had ties been broken by y ascending instead, same-x neighbors could
sit next to each other in sorted order and a plain LIS would wrongly chain
them. The strict search also rejects repeated y values, which the path
definition forbids just as firmly.

The LIS itself uses patience sorting with binary search (`lower_bound` /
`bisect_left`): tails hold the smallest possible ending y of an increasing
subsequence for each length, and each point replaces the first tail that
is not smaller than its y. With `n` up to `10⁵` this runs in
`O(n log n)` time — one sort and one binary search per point — while all
coordinates stay far inside 32-bit range and only the side buffers grow
with the input.

**Complexity:** `O(n log n)` time, `O(n)` space.

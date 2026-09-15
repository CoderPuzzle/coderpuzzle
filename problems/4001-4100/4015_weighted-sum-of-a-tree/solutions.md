# Solutions — Weighted Sum of a Tree

## Breadth-First Depths from the Root

The weight formula needs only each node's depth and the height `h`, so there
is nothing to build beyond counters: tally the children of every node from
the `parent` array, then run one iterative breadth-first pass from the root.
The queue emits nodes in nondecreasing depth order, so by the time a node is
dequeued its own depth is final and each of its children simply gets
`depth[node] + 1`. A second linear pass reads `h` off as the maximum depth
and accumulates `nums[i] * (h - depth[i] + 1)` into a 64-bit total.

Scanning the `parent` array in index order instead — computing
`depth[i] = depth[parent[i]] + 1` on the fly — silently breaks: the
constraints allow `parent[i] > i`, so a node's parent can sit later in the
array and still carry an unknown depth when the scan reaches it. Routing
every edge through the adjacency lists and letting the breadth-first order
decide when a node is ready removes any assumption about how parents and
children interleave.

The traversal must also be iterative: a chain of `10⁵` nodes drives any
recursive walk far past default stack limits (CPython caps at 1000 frames),
while an explicit queue never holds more than `n` entries. The accumulated
sum peaks at `10⁶ · n(n + 1)/2 ≈ 5 × 10¹⁵` on a full chain of maximum
values — far past a 32-bit accumulator, hence the 64-bit return — yet stays
under JavaScript's safe-integer bound `2⁵³`, so plain number arithmetic is
exact there too.

**Complexity:** `O(n)` time, `O(n)` space.

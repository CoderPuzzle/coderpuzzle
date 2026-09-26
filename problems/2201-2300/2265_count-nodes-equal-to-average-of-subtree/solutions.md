# Solutions

## Post-order sum-and-size fold

A node qualifies when its value equals the floor of its subtree average, so
the only per-node facts needed are the subtree's total value and its size.
Compute both bottom-up: each node receives `(sum, size)` from its children,
adds its own value and 1, and checks `floor(sum / size) == val` before
passing the pair upward. Every node is visited once and the check is constant
work.

![On root = [4, 8, 5, 0, 1, null, 6] the post-order fold carries (sum, size) up from the leaves and every node except 8, whose 9/3 = 3 misses, equals floor of its own ratio — including the root at 24/6 = 4 — so 5 nodes qualify.](figures/solution-postorder-sum-size-fold.svg)

The traversal is driven by an explicit stack of frames rather than the call
stack — a frame first schedules the children, then, on revisit, merges their
recorded results. This keeps deep (chain-shaped) trees within fixed heap
memory regardless of height. Leaves trivially qualify since a single-node
subtree averages to itself.

**Complexity:** `O(n)` time, `O(n)` space for the traversal structures.

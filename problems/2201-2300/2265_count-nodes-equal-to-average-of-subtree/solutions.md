# Solutions

## Post-order sum-and-size fold

A node qualifies when its value equals the floor of its subtree average, so
the only per-node facts needed are the subtree's total value and its size.
Compute both bottom-up: each node receives `(sum, size)` from its children,
adds its own value and 1, and checks `floor(sum / size) == val` before
passing the pair upward. Every node is visited once and the check is constant
work.

The traversal is driven by an explicit stack of frames rather than the call
stack — a frame first schedules the children, then, on revisit, merges their
recorded results. This keeps deep (chain-shaped) trees within fixed heap
memory regardless of height. Leaves trivially qualify since a single-node
subtree averages to itself.

**Complexity:** `O(n)` time, `O(n)` space for the traversal structures.

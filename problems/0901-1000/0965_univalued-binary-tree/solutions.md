# Solutions — Univalued Binary Tree

Uni-valued is a pointwise claim: every node, wherever it sits, must carry
one value, and that value can only be the root's. Nothing about pairs of
nodes or paths matters — a single dissimilar node anywhere sinks the
tree, and a tree with no dissimilar node passes. The single solution
below reads the tree level by level against the root's value and rejects
at the first disagreement.

## Level order against the root's value

The scan keeps a queue seeded with the root and drains it front-first,
children appended left before right, so every node surfaces exactly once
and in breadth-first order. Each surfaced node is held against the
root's value — the one reference the claim names — and the first
mismatch answers `false` on the spot; a queue that drains without a
mismatch has vouched for every node, which is `true`. Rejecting early
also means a dissenting node near the root costs a handful of
comparisons rather than a full scan.

The queue, not the call stack, carries the walk: a hundred-node chain of
one value is within the constraints, and the iterative loop keeps the
depth law — no frame nests no matter how lopsided the tree. Only the
queue occupies memory, and it never holds more than a level of the tree
plus the leading edge of the next.

**Complexity:** `O(n)` time, `O(n)` space.

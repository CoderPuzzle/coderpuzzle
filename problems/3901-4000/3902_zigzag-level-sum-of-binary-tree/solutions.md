# Solutions — Zigzag Level Sum of Binary Tree

An explicit breadth-first frontier exposes one complete level at a time. The
same frontier can be scanned in the required direction for its sum and then in
ordinary order to construct the next level.

## Iterative level frontiers

For odd levels, scan the frontier from left to right and stop before the first
node without a left child. For even levels, scan from right to left and stop
before the first node without a right child. Accumulate each sum in 64 bits,
because one level can exceed the 32-bit range.

After recording the sum, append every node's existing left and right children
to a new frontier, regardless of where summation stopped. This preserves the
tree's complete next level and avoids recursion even for very deep trees.

**Complexity:** `O(n)` time, `O(w)` space, where `w` is the maximum level width.

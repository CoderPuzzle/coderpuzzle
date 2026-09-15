# Solutions — Find a Corresponding Node of a Binary Tree in a Clone of That Tree

## Approach: Parallel iterative preorder

Walk the original and cloned trees in lockstep with one explicit stack of
node pairs: because both trees have identical shape, pushing both children of
a pair together keeps every pair aligned. When a popped original node carries
the target value, its cloned partner is the answer — return that subtree. The
walk is preorder, so the first hit is correct under unique values.

The explicit stack avoids recursion on trees up to 10^4 nodes (degenerate
trees exceed the runners' small thread stacks).

**Complexity:** `O(n)` time and `O(h)` space for `n` nodes and height `h`.

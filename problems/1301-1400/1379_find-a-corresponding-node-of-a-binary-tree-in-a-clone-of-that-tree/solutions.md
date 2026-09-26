# Solutions — Find a Corresponding Node of a Binary Tree in a Clone of That Tree

## Approach: Parallel iterative preorder

Walk the original and cloned trees in lockstep with one explicit stack of
node pairs: because both trees have identical shape, pushing both children of
a pair together keeps every pair aligned. When a popped original node carries
the target value, its cloned partner is the answer — return that subtree. The
walk is preorder, so the first hit is correct under unique values.

![On tree [7,4,3,null,null,6,19] with target 3, the lockstep stack of
(original, cloned) pairs pops (7,7), pushes (4,4) and (3,3), then pops (3,3)
and halts — returning the cloned 3 whose subtree is [3,6,19].](figures/solution-parallel-preorder-pairs.svg)

The explicit stack avoids recursion on trees up to 10^4 nodes (degenerate
trees exceed the runners' small thread stacks).

**Complexity:** `O(n)` time and `O(h)` space for `n` nodes and height `h`.

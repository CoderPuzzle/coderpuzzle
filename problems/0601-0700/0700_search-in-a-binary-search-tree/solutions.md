# Solutions — Search in a Binary Search Tree

## Ordered descent from the root

A BST sorts its own structure along the search path: every value in a
node's left subtree is below the node's value and every value in its right
subtree is above it, so one comparison with the current node settles which
side — if either — can still hold `val`. Descending from the root walks the
single path `val` could occupy: go left while `val` is smaller, right while
it is larger, and stop at the first node whose value equals `val` — that
node and everything under it are exactly the subtree to return — or at a
null child, which proves no node carries `val` and yields the empty tree
the wire renders as `[]`.

The descent is a plain loop holding one moving pointer and nothing else.
Iterating rather than recursing is not a style choice: the tree may be a
single 5000-node chain, so the search path itself can be 5000 links long —
recursion would nest 5000 calls, past CPython's default recursion limit of
1000 and needlessly deep on the fixed stacks the other runtimes hand out —
while the loop makes the depth irrelevant.

**Complexity:** `O(h)` time, `O(1)` space, where `h` is the tree's height —
as large as `n` = 5000 on a chain, as small as `log n` when balanced.

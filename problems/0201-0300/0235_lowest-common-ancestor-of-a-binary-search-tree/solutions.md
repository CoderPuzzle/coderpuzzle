# Solutions — Lowest Common Ancestor of a Binary Search Tree

Two ways of cashing the same ordering cheque. Both reach each target by a
straight comparison-guided walk, because a search tree never hides a target
behind an inspection. One writes each walk down as a list of values and
settles the matter afterwards, reading the two lists side by side. The
other spends nothing beyond its current position: the two questions travel
together, and the node where they part ways answers on the spot.

## Path Comparison

The other route keeps the two searches separate and lets paper do the meeting.
Walk from the root to `p`, recording the value of every node stepped through —
each step is the same single comparison as in the other variant, so the
recorded list is exactly the chain of ancestors of `p`, ending with `p`
itself. Then do the
same for `q`. Two lists, each in root-to-target order.

The shared ancestors are now visible rather than deduced: both lists begin at
the root, and they agree entry for entry as long as the two walks stayed on the
same node — which is precisely the condition of both targets lying in the same
subtree. Read the lists in lockstep and stop at the first disagreement; the
last value they agreed on is the deepest node whose subtree covers both.
Example 2 spells it out: the `20` path is `[50, 20]`, the `35` path is
`[50, 20, 35]`, and the lockstep ends where the shorter list does, at `20`
itself: the above-the-other shape falls out because one path is a prefix of
the other, with no case of its own.

What the lists buy is a separable question — each walk is an ordinary search,
and the ancestor logic lives in one small comparison loop afterwards. What
they cost is the memory the other method declines: two lists of up to `h`
entries, and a second full pass before anything is decided.

**Complexity:** `O(h)` time, `O(h)` space.

## Iterative BST Descent

The BST ordering property turns LCA into a walk. Every value in a node's left subtree is smaller than the node and every value in its right subtree is larger, so from any node you can tell which side any target lies on: if both `p` and `q` are smaller than the current node, the LCA must lie in the left subtree; if both are larger, it lies in the right subtree.

The first node where the two targets no longer sit on the same side is the answer. Every strict ancestor of that node has both targets inside one child subtree, so it is a common ancestor but not the lowest; at the split node the targets are separated into different subtrees — or the node's own value equals `p` or `q`, in which case it is an ancestor of the other target and of itself, which the LCA definition allows. Walking down from the root therefore lands exactly on the LCA.

The loop needs no stack, no recursion, and no parent pointers — just two comparisons per level, which makes the auxiliary space constant. In this judge the targets are given as values and the answer is the LCA's value, so the node's `val` is returned directly. The tree is not assumed balanced, so the height `h` can be as large as the node count on a degenerate tree.

**Complexity:** `O(h)` time, `O(1)` space.

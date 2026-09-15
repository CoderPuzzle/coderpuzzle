# Solutions — Minimum Depth of Binary Tree

## Breadth-first, returning at the first leaf

Breadth-first order visits a tree one level at a time, shallow before deep, so the first leaf it meets is necessarily a leaf at the minimum depth — every node on any shallower level was already inspected and found to be internal. The code keeps a `frontier` list holding exactly one level, counts a level each time it rebuilds the frontier from the real children, and returns that counter the moment a node with no children appears. An empty tree returns 0 before the loop starts, and because the search stops at the first leaf, nothing below the minimum depth is ever visited: for a 500-node chain with a leaf hanging off the root, the answer 2 costs two levels of work, not 500.

The level-order scan also dissolves the classic trap of this problem. The natural recursive definition `1 + min(depth(left), depth(right))` breaks on a node with a single child: the missing child answers depth 0, so the formula sees a phantom leaf and reports 1 for a tree like `[1, 2]`, whose only leaf sits at depth 2. Breadth-first search never asks a missing child anything; a leaf is recognized explicitly — both children absent — and a one-child node simply passes its real child along to the next frontier.

The traversal is iterative rather than recursive on purpose: the tree may hold up to `10⁵` nodes, and a skewed chain makes recursion depth grow with the node count — on the order of `10⁵` nested calls, deep enough that some language runtimes reject it as a stack overflow. The explicit frontier costs the same order of memory without touching any call stack. The early exit does not speed up the worst case — a pure chain holds no leaf until its last node, so every node is visited — but whenever shallow leaves exist, the search stops the instant the answer is proven.

**Complexity:** `O(n)` time worst case — every node above the first leaf's level enters exactly one frontier, and a pure chain forces all of them — and `O(w)` space for one frontier, where `w` is the maximum level width: `O(n)` at the bottom of a balanced tree, `O(1)` for a skewed chain.

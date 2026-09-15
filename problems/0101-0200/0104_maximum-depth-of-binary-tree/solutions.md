# Solutions — Maximum Depth of Binary Tree

## Iterative breadth-first level count

The depth of a tree is exactly the number of levels it has, and breadth-first order visits a tree one level at a time. The code keeps a frontier list holding one whole level, starting with just the `root`, and each round replaces it with the real children of every node it holds — precisely the next level — while a counter ticks up by one. When a round produces an empty frontier there are no levels left to see, so the counter equals the depth; an empty tree starts from an empty frontier and returns 0 without any special case.

Counting whole levels is what keeps the rounds honest: every node enters exactly one frontier, so the counter increments exactly once per level, never per node. Node values are irrelevant — only which children exist — and a leaf simply contributes nothing to the next frontier.

The traversal is deliberately iterative rather than the classic recursive `1 + max(depth(left), depth(right))`. The tree may hold up to `10⁴` nodes, and a skewed chain makes the recursion depth grow with the node count — around `10⁴` nested calls, deep enough that some language runtimes reject it as a stack overflow. The explicit frontier is the same order of memory without touching any call stack, and it behaves identically on chains, balanced trees, and the empty tree.

**Complexity:** `O(n)` time — each node enters exactly one frontier — and `O(w)` space for the frontier, where `w` is the maximum level width: `O(n)` worst case at the bottom level of a balanced tree, `O(1)` for a skewed chain.

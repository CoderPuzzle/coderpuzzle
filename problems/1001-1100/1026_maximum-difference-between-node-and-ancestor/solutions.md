# Solutions — Maximum Difference Between Node and Ancestor

## Iterative depth-first with a running min/max

The answer is the largest `|a.val - b.val|` over every ancestor-descendant
pair, and a depth-first walk finds it by carrying, at each node, the
minimum and maximum values seen among that node's strict ancestors. When a
node is visited, the best pairing that uses it as the descendant always
comes from one of those two running extremes — any other ancestor value
lies between them, so it can never beat both — so the running answer is
updated with `max(|node.val - pathMin|, |node.val - pathMax|)` before the
node's own value is folded into `pathMin`/`pathMax` for its children.
Folding after the compare, not before, matters: a node is never its own
ancestor, so the pair it contributes must come from strictly above it.

The traversal is deliberately iterative rather than the classic recursive
`dfs(child, min(pathMin, node.val), max(pathMax, node.val))`. The tree may
hold up to `5000` nodes, and a skewed chain makes recursion depth grow
with the node count — past the default recursion limit of some language
runtimes (Python's is 1000), deep enough to overflow the call stack. An
explicit stack of `(node, pathMin, pathMax)` frames walks the same tree
with the same asymptotics, without ever touching the call stack, so it
behaves identically on chains, balanced trees, and everything in between.

**Complexity:** `O(n)` time — each node is pushed and popped exactly once
— and `O(h)` space for the stack, where `h` is the tree height: `O(n)`
worst case on a skewed chain, `O(log n)` on a balanced tree.

# Solutions — Insufficient Nodes in Root to Leaf Paths

## Post-order prune with a remaining budget

A node is insufficient exactly when no root-to-leaf path through it reaches
the limit, so pruning can be decided in one post-order pass. Carry the
`remaining` budget down the tree: for a node, `remaining` is the limit
minus the sum of its strict ancestors, so a leaf survives iff its own value
is at least `remaining`. An internal node survives iff, after its two
subtrees are pruned, at least one child remains — if both children were
removed, no leaf below the node can reach the limit, so the node itself is
removed too. Because the decision for a node depends only on the original
path sums above it and the pruned state of its children, this matches the
"simultaneously" wording of the statement.

The recursion is implemented with an explicit stack instead of function
calls. The tree may hold up to `5000` nodes, and a skewed chain makes the
recursion depth grow with the node count — past the default recursion limit
of some language runtimes (Python's is 1000), deep enough to overflow the
call stack. Each stack frame stores `(node, remaining, parent, is_left,
revisited)`: the first visit pushes the children with the budget reduced by
the node's value and re-pushes the node with `revisited` set; the second
visit performs the keep-or-prune test, detaching a pruned node from its
parent. Every node is visited twice, so the whole tree is pruned in a
single linear walk.

**Complexity:** `O(n)` time — each node is pushed and popped twice — and
`O(h)` space for the stack, where `h` is the tree height: `O(n)` worst
case on a skewed chain, `O(log n)` on a balanced tree.

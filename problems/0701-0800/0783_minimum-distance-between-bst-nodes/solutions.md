# Solutions — Minimum Distance Between BST Nodes

A binary search tree is not just a bag of values — its order is the answer's
scaffolding. One fixed traversal reads the values off already sorted, and
over a sorted sequence the closest pair is always some adjacent pair.

## Inorder neighbors in one pass

An inorder walk — left subtree, node, right subtree — visits a BST's values
in ascending order, and that collapses the pairwise question into an
adjacent one: if two values in the tree have a third between them, that
third sits closer to one of them than the two sit to each other, so the
closest pair in the whole tree is always two consecutive visits. The
minimum over all pairs is therefore the minimum over inorder neighbors, and
a pass that remembers only the previously visited value and folds in each
new difference finds it — no pair enumeration, no sorting, no extra array.

The walk carries its own stack instead of the call stack: push while
descending left toward the next unvisited node, pop to emit the next value
in ascending order, then resume from the popped node's right child. The
tree may legally be a single 100-node chain, and the explicit stack keeps
that worst case as flat as any other — it never holds more than the path
from the root down, one entry per level. Every emitted difference is
non-negative because the sequence ascends, so a running minimum suffices,
and with at least two nodes in the tree the answer is set before the walk
ends.

Values live in `[0, 10⁵]`, so no difference can exceed `10⁵`: every quantity
in the walk fits the plain integer width of each language, and nothing
beyond the previous value and the height-deep stack is ever stored.

**Complexity:** `O(n)` time, `O(h)` space.

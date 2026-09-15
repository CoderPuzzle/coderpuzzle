# Solutions — Leaf-Similar Trees

## Two explicit stacks, one leaf sequence each

A tree's leaf value sequence is exactly what a depth-first walk meets when
it always takes the left branch before the right, written down at the
moments it reaches a leaf. The walk carries an explicit stack: pop a node,
and if both children are missing record its value — that node is a leaf —
otherwise push the right child and then the left, so the left subtree is
always the next to pop. An exhausted stack means the sequence is complete,
and the trees are leaf-similar exactly when the two written sequences are
equal.

Because only leaves enter the sequences, everything internal is invisible
to the comparison: values at internal nodes, and the shapes above the
leaves, may differ freely. `[1,2,3]` and `[200,2,3]` agree — both
sequences are `(2, 3)` — while `[1,2,3]` and `[1,3,2]` disagree, sharing
the same multiset of leaves in a different left-to-right order. A
disagreement can also hide in the length: one tree may run out of leaves
while the other still has some, which is why the comparison waits until
both sequences are complete rather than stopping at the first shared leaf.

Both walks stay off the call stack by design. Each explicit stack holds at
most one pending subtree per level of its tree, and each written sequence
holds at most one value per node, so everything the method keeps is linear
in the trees.

**Complexity:** `O(n1 + n2)` time, `O(n1 + n2)` space.

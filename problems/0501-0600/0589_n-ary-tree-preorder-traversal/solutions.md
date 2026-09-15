# Solutions — N-ary Tree Preorder Traversal

## Explicit stack, children pushed last-first

Preorder emits a node before any of its descendants, and a node's first
child's subtree before its second child's. A work stack reproduces that
order directly: pop a node, emit it, then push its children in reverse —
the last child goes on first, so the first child sits on top and its entire
subtree is consumed before any sibling appears. Each node enters and leaves
the stack exactly once, and the emitted sequence is the preorder walk by
construction.

The stack depth is bounded by the tree's height times the widest group on
the current path, never by recursion frames — a 1000-node chain or a
1000-leaf root are both plain loop iterations, which is what the follow-up
asks for.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.

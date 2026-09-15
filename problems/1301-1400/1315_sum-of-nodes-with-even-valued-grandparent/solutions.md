# Sum of Nodes with Even-Valued Grandparent

## Approach: Iterative DFS carrying (parent, grandparent)

Whether a node counts depends only on its grandparent's parity, so the
traversal carries the last two values down with the node: each stack entry
holds (node, parent value, grandparent value), and the children are pushed
with the roles shifted one level down. A node whose carried grandparent
value is even contributes its value to the running sum.

The traversal uses an explicit stack rather than recursion — the tree may
be a 10⁴-node chain, far beyond the default recursion budget of every
language in the judge. Each node is pushed and popped exactly once, and
the carried values are plain integers, so no extra structure beyond the
stack is needed.

**Complexity:** O(n) time, O(h) auxiliary space for the stack, where h is
the tree height (O(n) worst case for a chain).

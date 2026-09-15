# Solutions — Delete Tree Nodes

## Bottom-up fold of subtree sum and kept count

Every decision is local to a parent: a node's subtree survives iff its
subtree value sum is nonzero. So compute, for each node, two numbers and
hand them to the parent only when the subtree survived — its sum folded
into the parent's running sum, its kept-node count added to the parent's
count. A zero-sum subtree hands up nothing at all: it stops counting
toward every ancestor's sum (which is exactly what "removing" it means)
and contributes no nodes. The answer is the root's kept count, or 0 when
the whole tree sums to zero.

Mechanically, build children lists once, take a parents-before-children
visit order from an explicit stack walk (recursion depth on a 10^4-node
path would overflow some runtimes), then process that order reversed so
every node is finalized before its parent reads it.

**Complexity:** `O(n)` time over `n = nodes`, `O(n)` space for the
children lists and visit order.

# Solutions — Lowest Common Ancestor of Deepest Leaves

## Height table, then descend toward the taller side

Call the _height_ of a node the depth of the deepest leaf below it. The
answer is characterized by two facts: the subtree of the answer contains a
deepest leaf on **both** sides (otherwise the answer is deeper inside the
taller child), and at that node the two heights tie — because the global
maximum depth equals the node's own height exactly when both children reach
it. So the algorithm is: compute every node's height, then start at the root
and repeatedly step into the taller child; the first node whose children's
heights tie (or which has no deeper side at all) is the lowest common
ancestor of the deepest leaves.

Heights are computed in one reversed breadth-first pass: BFS lists parents
before children, so the reversed list visits every child before its parent,
letting each node read `1 + max(children)` from an already-settled table.
The traversal is deliberately iterative — the tree may be a 1000-deep chain,
right at the edge of the judged runtimes' recursion budgets.

The descent is at most the tree's height, and each step is two table
lookups. The returned value is the answer node's own subtree, exactly the
serialization the wire expects.

**Complexity:** `O(n)` time — one BFS for the order, one reversed pass for
heights, one descent — and `O(n)` space for the order list and the height
table.

# Solutions — Second Minimum Node In a Binary Tree

## Descend the minimums, prune the rest

The min property settles the first question before any walk happens: a parent
holds the smaller of its two children's values, so along every root-to-node
path values never decrease, and the root's value is the minimum of the whole
tree. The second minimum is therefore just the smallest value strictly greater
than `root.val`, and a search that tracks only that one number needs no set of
seen values, no sort, no second pass.

The pruning follows from the same property. A node still carrying the root's
value may hide a larger-but-smallest candidate beneath it, so the walk
descends into it — always through children, since the tree gives every node
either two or none. A node with a larger value needs no descent: everything in
its subtree is at least that node's own value, so the node itself is the best
its whole subtree can contribute. The walk takes it as a candidate and prunes
the subtree entire — however deep that subtree grows, it costs a single visit.

The answer accumulator starts at `-1`, which no node value can equal
(`Node.val` is at least 1), so when every node equals the root the untouched
`-1` comes back exactly as the statement demands. The traversal carries an
explicit stack of nodes rather than recursing; visit order is irrelevant
because only the minimum of the candidates is kept.

**Complexity:** `O(n)` time — every node is pushed and popped at most once —
and `O(h)` space for that stack, where `h` is the tree's height.

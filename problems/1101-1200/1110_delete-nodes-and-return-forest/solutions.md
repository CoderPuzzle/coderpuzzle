# Solutions — Delete Nodes And Return Forest

## Post-order prune with a deleted set

The work is entirely local: whether a node survives depends only on whether
it is deleted and on what its two children returned, so a post-order
recursion is the natural fit. A hash set of the values in `to_delete` gives
`O(1)` membership tests, and each node is visited exactly once.

For each node the code recurses into both children first, reattaching the
(possibly pruned) results. If the node itself is deleted, it must not appear
in the forest — but if either child came back non-null, that child's subtree
was cut loose by this deletion, so it becomes a new tree root and is added to
the result. The node then returns `null` so its parent drops it. If the node
is not deleted, it keeps whatever children survived and returns itself.

![Running the post-order prune on root [1,2,3,4,5,6,7] with to_delete = [3,5], the deleted nodes 3 and 5 are struck out and nodes 6 and 7 are cut loose as new roots beside the surviving root 1, giving [[1,2,null,4],[6],[7]].](figures/solution-postorder-prune-forest.svg)

The only surviving root not produced by a deletion is the original root, so
after the recursion the code checks whether the root's pruning left it alive
and adds it to the forest if so. Because every node value is distinct, a set
of deleted values is unambiguous, and the recursion depth is bounded by the
tree height — at most 1000 nodes, comfortably within the runtime stack limits.

**Complexity:** `O(n)` time, `O(n)` space — each node is visited once, the
deleted set holds `k` values, and the recursion stack reaches the tree height.

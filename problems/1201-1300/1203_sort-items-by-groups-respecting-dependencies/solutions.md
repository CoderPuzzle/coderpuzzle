# Solutions — Sort Items by Groups Respecting Dependencies

## Two-Level Topological Sort

The key insight is that the ordering constraint decomposes into two layers. Items in the same group must be contiguous, so the output is a sequence of whole groups; the order of the groups must respect every dependency that crosses a group boundary, and within each group the items must respect the dependencies that stay inside. Both layers are topological sorts, and the item-level sort of one group can never conflict with another group's.

Ungrouped items (`group[i] == -1`) are first given their own fresh group id, which turns every item into a member of exactly one group and lets both layers treat them uniformly. Two dependency graphs are then built: an item graph containing every `beforeItems` edge, and a group graph containing only the edges whose endpoints land in different groups (edges inside a group are deferred to that group's internal sort). Cross-group edges may be duplicated by several item pairs, which is harmless since Kahn's algorithm counts each parallel edge consistently in the indegree.

Kahn's algorithm (a queue of zero-indegree nodes, decrementing indegrees as nodes are emitted) runs first over the groups. If it fails to emit all groups, a cycle exists and the empty list is returned immediately. Otherwise the groups are visited in that order, and for each one, the precomputed item adjacency is filtered to intra-group edges and Kahn runs again over just that group's items; a failure here also yields the empty list. Emitting groups first guarantees contiguity, while the intra-group sort resolves internal dependencies. Writing `E` for the total dependency pairs and `n` for items plus groups (at most twice the item count), all passes are linear in `n + E` apart from the small sorts that fix each Kahn queue's deterministic order.

**Complexity:** `O(n log n + E)` time, `O(n + E)` space.

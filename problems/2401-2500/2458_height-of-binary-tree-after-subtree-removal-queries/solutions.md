# Solutions — Height of Binary Tree After Subtree Removal Queries

## Two-Pass DFS with Outside Maximum

Answering up to `10^4` independent queries demands `O(1)` per query, so every node's answer is precomputed before any query is asked. When the subtree rooted at node `q` vanishes, the remaining tree's height is the largest depth (in edges, from the original root) reached by any node _outside_ `q`'s subtree. Call that quantity `outside(q)`; the task reduces to computing, for every node, the deepest node depth among all nodes not in its subtree — with a convention of `-1` when nothing remains.

Two cheap tables make this possible in one bottom-up sweep. `depth[v]` is the root-to-node distance, filled by a pre-order walk. `height[v]` is the usual subtree height in edges, and `submax[v]` is the deepest node depth anywhere inside `v`'s subtree, i.e. `max(depth[v] + height[v], submax of children)`; both come from iterating a pre-order sequence in reverse, which is a valid post-order, so children are always finalized before their parent.

A final top-down pass then distributes the outside maximum. The root starts with `-1` (removing it leaves nothing). When descending from a node `u`, the outside maximum offered to a child excludes `u`'s whole subtree and everything already outside it, but must additionally consider paths that stay in the tree by routing through `u` into the _sibling_ subtree: its level is `depth[u] + 1 + height[sibling]`, equivalently `submax[sibling]` (the code checks both forms, which coincide). Taking the max of the inherited value and the sibling contributions gives each child its exact `outside` value, stored in `ans` keyed by node value. Queries then reduce to a dictionary lookup.

Every node is visited a constant number of times across the three sweeps, and each visit does constant work. The recursion-free stack-based traversals keep the `10^5`-node worst case clear of Python's recursion limit.

**Complexity:** `O(n + m)` time, `O(n)` space.

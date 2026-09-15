# Solutions — Smallest Missing Genetic Value in Each Subtree

## Mark subtrees along the path from genetic value one

Every subtree without genetic value `1` has answer `1`, so only the node holding
`1` and its ancestors can have different answers. Build the children of every
node, locate the node whose value is `1`, and walk from that node to the root.

At each ancestor, use an explicit stack to visit every not-yet-visited node in
its subtree and mark its genetic value as present. Nodes exposed at an earlier
ancestor stay visited, so each tree node is processed once across the whole
walk. A shared candidate advances while its value is marked and therefore gives
the smallest missing value for the current ancestor. Iterative traversal avoids
depending on call-stack depth for a tree of `10⁵` nodes.

**Complexity:** `O(n + V)` time, where `V` is the number of candidate values examined, and `O(n)` space.

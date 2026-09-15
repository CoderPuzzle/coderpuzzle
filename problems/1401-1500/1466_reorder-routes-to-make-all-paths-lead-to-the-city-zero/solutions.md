# Solutions — Reorder Routes to Make All Paths Lead to the City Zero

## Rooted Tree Traversal Counting Misdirected Edges

The road network is a tree, so from every city there is exactly one path to the capital. After reorientation, each edge must point from the child side of the tree toward the root, because the unique path from any city to city 0 must follow edge directions the whole way. Consequently, an edge must be flipped exactly when — viewed from the root — its original orientation runs away from the root, from parent to child.

![The example road tree rooted at city 0: the three brown edges point away from the root and flip.](figures/solution-flip-edges.svg)

The solution builds an undirected adjacency list in which each entry remembers the original direction as a flag: seen from city a, the neighbor b carries flag 1 when the original road runs a → b, and seen from b the neighbor a carries flag 0. A stack traversal starting at city 0 then explores the whole tree, skipping already-visited neighbors, and counts one change for every traversed edge flagged as originally pointing away from the root.

Because the visited marking confines the traversal to edges leading away from the root, a flag-1 edge on the walk fights the required root-ward direction and must be reversed, while a flag-0 edge already agrees and costs nothing. Each city and edge is examined a constant number of times, and the traversal visits all n cities since the underlying graph is connected. The problem guarantees a solution exists — and for a tree rooted at 0 one always does, since any misdirected edge can simply be flipped.

**Complexity:** `O(n)` time, `O(n)` space.

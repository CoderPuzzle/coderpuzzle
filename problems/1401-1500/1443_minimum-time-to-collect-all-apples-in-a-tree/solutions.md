# Solutions — Minimum Time to Collect All Apples in a Tree

## Iterative DFS Propagating Apples Upward

Since the walker starts and ends at vertex 0, any edge that gets used at all is traversed exactly twice — once going down toward an apple and once returning. The answer is therefore twice the number of edges lying on some root-to-apple path, which equals twice the number of non-root vertices whose subtree contains an apple.

![The example tree: apples at 2, 4, 5 make the four dashed edges necessary, each walked twice.](figures/solution-apple-tree.svg)

To compute this without recursion (n can reach 10^5, and deep recursion is a liability in Python), the solution first runs an explicit stack traversal from vertex 0 over the undirected tree, recording each vertex's parent and a discovery order. It then sweeps that discovery order in reverse, so children are always processed before their parents. Whenever it meets a vertex that carries an apple, it adds 2 for the edge up to its parent and marks the parent as carrying an apple too, propagating the requirement toward the root.

Correctness rests on a simple invariant of the ordering: a vertex appears later in the discovery order than its parent, so by the time the reversed sweep reaches a vertex, its entire subtree has already been resolved and the vertex is marked exactly when it or any descendant holds an apple. The root itself is skipped because it has no parent edge. A tree with no apples never triggers an addition and yields 0, and an apple sitting on the root contributes nothing, which is right — no travel is needed for it.

**Complexity:** `O(n)` time, `O(n)` space.

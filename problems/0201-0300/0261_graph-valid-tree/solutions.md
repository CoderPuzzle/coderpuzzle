# Solutions — Graph Valid Tree

Two tests arrive at the same verdict from opposite ends: both open by
counting, since `n` nodes joined as a tree carry exactly `n - 1` edges and
any other count settles the matter with no searching at all. What splits
them is the second half — one assembles the graph edge by edge and listens
for the moment an edge closes a loop; the other never builds a component
structure, walks the finished graph once from a single starting node, and
simply counts what it reaches.

## Edge-Count Check with Union-Find

A tree on `n` nodes must have exactly `n - 1` edges _and_ be connected, and these two requirements interact usefully: with precisely `n - 1` edges, the graph is a tree exactly when it contains no cycle (n - 1 edges, no cycle, simple graph forces connectivity). So the solution first answers immediately on the edge count — `n - 1` edges is necessary, and any other count (too few to connect, too many to stay acyclic) fails without further work.

The remaining question, "does adding these n - 1 edges ever create a cycle?", is what Union-Find answers incrementally. Each node starts as its own component; for every edge `[a, b]` the code finds both endpoints' roots, and if the roots already coincide the edge joins two nodes in one component — a cycle — and the answer is false on the spot. Otherwise the two components are merged by pointing one root at the other.

The `find` helper uses path halving (`parent[x] = parent[parent[x]]` while walking up), so every traversal short-circuits future ones and the amortized cost per operation stays logarithmic — effectively constant at these sizes (n ≤ 2000, e ≤ 5000). If all `n - 1` edges merge distinct components, the graph is connected and acyclic, hence a valid tree. The parent array is the only auxiliary storage.

**Complexity:** `O(n + e·log n)` time, `O(n)` space.

## BFS from Node Zero

The same count, then a different question. A graph with `n - 1` edges that
is connected cannot contain a loop — each edge must be doing join work —
so connectivity alone finishes the proof. Where union-find watches loops
appear during assembly, this variant builds the adjacency lists and sends
one breadth-first walk across the finished graph: mark node `0`, then
repeatedly take the next queued node and mark its unmarked neighbours,
counting every node as it is first reached. The frontier spreads level by
level, so every node in node `0`'s component is counted exactly once; the
verdict is `visited == n`.

On Example 3 (`[[0,1],[2,3]]`) the walk marks `0` and `1`, empties the
queue, and stops at two of four nodes — two components, so `false`, which
the count check had already ruled out before any of this ran. A one-node
graph is the degenerate success: zero edges, and the walk counts node `0`
against `n = 1` immediately. The queue plus the mark array and adjacency
lists hold the memory; every node enters the queue at most once and every
edge is read twice, so the sweep is strictly linear.

**Complexity:** `O(n + e)` time, `O(n + e)` space.

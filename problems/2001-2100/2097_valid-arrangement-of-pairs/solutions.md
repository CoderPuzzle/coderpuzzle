# Solutions — Valid Arrangement of Pairs

## Eulerian Path via Hierholzer's Algorithm

Treat every number as a node and every pair `[start, end]` as a directed edge from `start` to `end`. A valid arrangement chains pairs so that each pair's end is the next pair's start, which is exactly a walk that uses every edge exactly once — an Eulerian path. Because the problem guarantees a valid arrangement exists, the graph is connected (on nodes with edges) and has at most one node with `outdegree − indegree == 1`.

The solution builds an adjacency list plus in/out degree counters, then picks the start node: the unique node whose outdegree exceeds its indegree by one, falling back to the endpoint of the first pair when the graph is an Eulerian circuit (all degrees balanced, so any edge-bearing node works). It then runs iterative Hierholzer's algorithm with an explicit stack: peek the top node, and while it still has unused edges, pop one and push the neighbor. When the top node has no remaining edges, it is appended to the `path` list and popped. Reversing `path` at the end yields the Eulerian path's node sequence, and consecutive nodes `[path[i], path[i+1]]` reconstruct the arrangement of pairs.

![The example pairs as a directed chain 11 → 9 → 4 → 5 → 1: node 11 is the unique out − in = 1 start, node 1 the dead-end sink, and the explicit stack deepens along the walk before unwinding into the reversed path that yields the arrangement.](figures/solution-euler-walk.svg)

The stack-based formulation avoids recursion depth limits on inputs with up to 10⁵ edges, and popping from the end of each adjacency list makes edge consumption O(1). Multi-edges (repeated pairs) are handled naturally since adjacency lists simply hold duplicates, and the reversal step correctly post-orders nodes discovered by dead-end backtracking. With V distinct numbers and E pairs (V ≤ 2E), the whole walk touches each edge once.

**Complexity:** `O(V + E)` time, `O(V + E)` space.

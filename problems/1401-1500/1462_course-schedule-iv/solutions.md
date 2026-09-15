# Solutions — Course Schedule IV

## Topological Sort With Bitset Reachability

Each query asks whether course u is a prerequisite of course v, which is a reachability question on the prerequisite DAG when each pair is read as the edge a → b. With up to 10^4 queries, running a search per query is wasteful; instead all reachability is precomputed in one pass so that every query becomes a single bit test. The table entry reach[v] is the set of courses from which v can be reached.

The solution runs Kahn's algorithm with an indegree array and a queue seeded with the indegree-zero courses. When a course u is popped, the set it forwards is reach[u] merged with u's own bit, and this is OR-merged into every course that depends on u while its indegree is decremented. Topological order is what makes a single pass sufficient: by the time u is popped, every course that can reach u has already merged its bits into reach[u], so the transitive closure propagates with no iteration or fixpoint loop.

Each reachability set is one integer of numCourses bits, so a merge is a single word-packed OR instead of an element-by-element union — the precomputation is effectively linear in the number of edges plus a small per-operation cost for the bit arithmetic. The graph is guaranteed acyclic, so every course is eventually popped and no course is left with a stale indegree. Answering a query then just tests whether u's bit is set in reach[v].

**Complexity:** `O((V + E) · V / 64 + Q)` time, `O(V² / 64)` space.

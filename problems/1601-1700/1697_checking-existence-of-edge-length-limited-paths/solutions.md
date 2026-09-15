# Solutions — Checking Existence of Edge Length Limited Paths

## Offline Queries with Union-Find

The key insight is that all queries are known in advance, so they can be answered offline in a favorable order instead of running a shortest-path search per query. A query with limit `L` asks whether `p` and `q` are connected using only edges of weight strictly less than `L`. As `L` grows these edge sets are nested, which is exactly the structure union-find supports incrementally.

The solution sorts `edgeList` by weight and sorts the query _indices_ by their limit. It then sweeps queries in increasing limit order while advancing a pointer over the sorted edges: before answering a query, every edge with weight `< limit` is unioned into the disjoint-set structure (using path halving in `find`). The query itself reduces to a single connectivity check, `find(p) == find(q)`. Sorting indices rather than the queries themselves lets each answer be written back to its original position in the output array.

Correctness follows from monotonicity: once an edge is below some query's limit it is below every later (larger) limit, so the union-find forest only needs to grow. The strict inequality is handled by the loop condition `edges[ei][2] < limit`, which stops before consuming an edge exactly equal to the limit. Parallel edges between the same pair are harmless — the second union is a no-op — and the constraints guarantee `p != q`, so no query degenerates to comparing a root with itself.

**Complexity:** `O(E log E + Q log Q)` time, `O(n + Q)` space.

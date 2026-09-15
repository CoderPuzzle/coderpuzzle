# Solutions — Design Graph With Shortest Path Calculator

## Adjacency List plus Per-Query Dijkstra

Edges are only ever appended — never removed or reweighted — so the whole
mutable-graph question reduces to an adjacency list of `(target, cost)` pairs
that `addEdge` appends to in constant time. Nothing needs invalidating or
rebuilding; the interesting work is entirely inside a query.

Every cost is positive, which makes `shortestPath` a textbook Dijkstra run
from `node1`. A min-heap ordered by tentative distance hands out nodes in
settle order; popping a node whose heap entry is older than its recorded
distance means it was already settled through a cheaper route, and it is
skipped. Each relaxation that improves a neighbor pushes a fresh entry, so
entries are stale at most once and the loop runs `O((n + e) log n)` per
query. Two practical touches: the search returns the moment `node2` is
popped (its distance is final at that point), and `node1 == node2` short
circuits to `0` before any setup.

With `n <= 100`, at most `9900` initial edges plus `100` added ones, and
`100` queries, even the worst case — every query scanning the full dense
graph — is on the order of a few million heap operations at most, far inside
the limits; caching all-pairs distances would buy nothing at this scale
(which is what the follow-up probes).

Both the Python and Java canonical solutions implement exactly this scheme
(Java accumulates distances in `long` even though path costs fit an `int`,
keeping the `Long.MAX_VALUE` sentinel arithmetic clean).

**Complexity:** `O(1)` per `addEdge`, `O((n + e) log n)` per `shortestPath`,
`O(n + e)` space.

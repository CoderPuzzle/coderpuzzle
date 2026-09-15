# Solutions — Connecting Cities With Minimum Cost

Both grow the same cheapest tree on the strength of one fact: any way you
split the nodes, the lightest link with one endpoint on each side belongs to
some minimum purchase. Kruskal reads the whole catalogue in price order,
buying each offer that joins two groups still separate and tracking the
groups in a disjoint-set structure. Prim plants a single node instead and
grows the purchase outward, keeping the offers leaving the tree in a
priority queue so the cheapest is always the one on top.

## Kruskal's Algorithm with Union-Find

Connecting all `n` cities at minimum total cost is the definition of a minimum spanning tree on the graph whose vertices are cities and whose weighted edges are the connections. Kruskal's algorithm builds it greedily: sort every edge by cost and accept an edge only when its endpoints currently lie in different connected components. The exchange argument guarantees optimality — among all edges crossing any cut, refusing a more expensive one in favor of a cheaper accepted one never increases the total.

Components are tracked by a union-find structure over the `n + 1` slots (index 0 unused, since cities are 1-based). `find` walks up the parent array and applies path halving on the way (`parent[x] = parent[parent[x]]`), which keeps subsequent finds near-constant without needing union by rank. An edge is accepted exactly when `find(x) != find(y)`; then the two roots are linked, its cost is added to the running total, and the component count drops by one.

Starting from `n` components, the algorithm can return early the moment the count reaches 1 — the tree is complete and no later (more expensive) edge can help. If the edges run out first, the graph was disconnected and the answer is `-1`. Duplicate or expensive edges are skipped harmlessly by the same-roots check, and the sort ensures the cheapest spanning choices are always considered first.

Sorting the up-to-10^4 edges dominates the running time; the union-find operations after sorting are effectively linear.

**Complexity:** `O(E log E)` time, `O(V)` space.

## Heap-Based Prim

Prim refuses to price the whole catalogue up front. Plant node `1` as the
root of the purchase and keep what is bought connected at every step; the
only question that matters is which offer to take next, and the answer is
the cheapest one leaving the tree. A priority queue of `(price, node)`
records keeps that answer on top, so growth is a loop of pops and
settlements rather than one global sort.

Correctness rests on the same cut property Kruskal leans on, read from the
growing side. The bought nodes form one shore of a cut and every unsettled
node the other; the lightest link with one endpoint on each shore is safe
to buy, and that is precisely the record the queue yields next. Which node
serves as the root cannot matter, since every minimum tree costs the same
total.

The catalogue arrives as a flat list of offers, so the first move is to
re-index it into adjacency lists, each link filed under both endpoints
because it is undirected. A `visited` flag over the `n + 1` slots (slot `0`
idle, numbering starting at one) marks the shore. Queued records are never
decreased in place — a cheaper offer for a node already queued is pushed as
a second record, and the loser of that race is discarded on its pop by the
stale-entry guard `visited[v]`. Settling a node books its record's price
into the running bill — the root's own record carries price `0`, so
planting the tree costs nothing — and files the offers to its
still-unsettled neighbours.

Each settlement grows the tree by exactly one node, so after `n` of them
the purchase spans everything and the loop stops with whatever is left in
the queue unread. A queue that drains while nodes remain unsettled means
the catalogue never reached them, and `-1` is the honest answer. Repeated
offers between the same pair, and offers of price `0`, need no special
handling — the stale-entry guard buries the redundant records.

Every offer enters the queue at most twice, once per endpoint, and each
push and pop costs a single logarithmic step; no sort of the catalogue
happens anywhere.

**Complexity:** `O(E log V)` time, `O(V + E)` space.

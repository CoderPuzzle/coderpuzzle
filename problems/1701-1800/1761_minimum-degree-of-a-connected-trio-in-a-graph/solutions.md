# Solutions — Minimum Degree of a Connected Trio in a Graph

A connected trio is a triangle of the graph, and its degree counts the
edges leaving it. Enumerating node triples is cubic work, and recounting
each found trio's external edges is worse still; both are avoidable,
because a trio's degree is `deg(u) + deg(v) + deg(w) - 6` — the three
internal edges are exactly the edges the vertex degrees count twice.
What actually has to be found is the triangle with the cheapest degrees.

## Cheapest common neighbor per edge

Every trio contains an edge, so instead of enumerating trios, score each
edge: fixing `(u, v)`, the best trio through it attaches the
minimum-degree common neighbor `w`, for a candidate of `deg(u) +
deg(v) - 6` plus that neighbor's degree. Taking the minimum of this
quantity over all edges reaches every trio through each of its three
edges, so none is missed, and a graph where no edge ever has a common
neighbor is exactly a trio-free graph, which answers `-1`.

Finding the cheapest common neighbor is made constant work by ranking
the nodes by `(degree, id)` — so rank order is degree order — and
storing each node's neighborhood as a bitset over those ranks, one
machine word per 64 nodes (an arbitrary-width integer where the
language offers one). The intersection `mask[u] & mask[v]` costs `n/64`
word operations per edge, and its lowest set bit is the
minimum-degree common neighbor itself, so no scan of the intersection
is needed at all. A sentinel of `3n`, above every real candidate's
maximum of `3(n - 1) - 6`, survives untouched precisely when no trio
exists.

**Complexity:** `O(n log n + E·n/64)` time, `O(n²/64 + E)` space.

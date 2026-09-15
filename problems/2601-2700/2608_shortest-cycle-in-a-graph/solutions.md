# Solutions — Shortest Cycle in a Graph

## BFS from every vertex with parent-checked cross edges

Root a BFS at each vertex in turn. The search lays out a tree of shortest
distances from that root; every edge then falls into one of two classes.
A tree edge merely retraces how the search discovered its endpoint, but any
_cross_ edge `(u, v)` — one whose endpoints already knew shorter routes back
to the root — closes a ring whose length is exactly `dist[u] + dist[v] + 1`:
walk from the root down to `u`, hop across, and climb back up `v`'s levels.

Two details keep the count honest. First, an edge must be rejected when
either endpoint is the other's `parent`, because re-scanning the very edge
that built the tree would report "cycles" of no such length. Second,
iterating the root over all vertices guarantees exactness: pick the true
shortest cycle and root a BFS anywhere on it — its own edges survive as
cross edges (or as level-equal contacts) measuring a length no smaller than
what another root may have found elsewhere, and never larger than the cycle
itself. Queues are plain arrays with a head cursor, so nothing recurses.

**Complexity:** `O(n · (n + m))` time, `O(n + m)` space.

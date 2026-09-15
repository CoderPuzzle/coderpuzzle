# Solutions — Shortest Distance After Road Addition Queries I

The road network only ever grows, yet no summary of the old network stays
valid once a road is added: an earlier shortest path can be beaten by the
new road together with everything reachable through it. Since both `n` and
the number of queries are capped at 500, the simplest exact strategy wins —
reanswer from scratch after every addition instead of trying to patch the
previous distance incrementally.

## BFS after each addition

Keep the roads in an adjacency list seeded with the initial chain edges
`i -> i + 1`. Each query appends its road to that list, then one unweighted
BFS from city 0 recomputes shortest distances; every road counts as one
step, so the first time the search dequeues city `n - 1` its distance is
final and the traversal can stop without exploring farther layers.

Each query therefore costs one traversal of the current graph, and the
distance found is appended to the answer in order. No priority queue is
needed — all roads weigh the same — and no special check decides whether a
road mattered: the BFS simply reports the new best distance, which includes
the possibility that nothing changed.

**Complexity:** `O(q·(n+q))` time, `O(n+q)` space.

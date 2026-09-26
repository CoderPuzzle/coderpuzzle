# Solutions — Minimum Time to Reach Destination in Directed Graph

## Earliest-arrival Dijkstra with window-gated edges

The quantity to minimize is an arrival time, and every move costs exactly
one tick (travelling) or leaves the clock running without moving you
(waiting), so arrival times only ever grow along a path. That is precisely
the setting Dijkstra answers: keep `dist[u]`, the soonest time you can be
standing on node `u`, in a min-heap keyed by time and relax outward with
lazy deletion of stale entries.

The windows make one edge rule. Standing on `u` at time `t`, an edge
`[u, v, start, end]` is usable only while the clock is inside its window,
and since waiting is free-form the only sensible departure is
`max(t, start)`: earlier is impossible and later merely arrives later. If
that moment exceeds `end` the edge is dead — it can never be taken from
this state, because `t` is already `u`'s earliest arrival. Otherwise the
edge delivers `v` at `max(t, start) + 1`, which relaxes `dist[v]` when it
improves it. The start node seeds the heap at time 0; the answer is
`dist[n - 1]`, or `-1` when it stays infinite. Times are bounded by
`10⁹ + 1`, so the labels are held 64-bit in the compiled languages while
plain JS numbers remain exact far below `2⁵³`.

![On Example 2's graph, the time axis shows the winning windows [1,5] and [4,7]:
Dijkstra waits at node 0 until t = 1 to reach node 2 at t = 2, waits there until
t = 4, and settles node 3 at t = 5, beating the t = 8 route through node 1.](figures/solution-window-gated-dijkstra.svg)

The heap performs `O(E)` pushes in the worst case, each `O(log E)`, over an
adjacency list built in one pass — well inside the limits for
`n, E ≤ 10⁵`.

**Complexity:** `O(E log E)` time, `O(n + E)` space.

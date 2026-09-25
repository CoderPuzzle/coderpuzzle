# Solutions — Minimum Cost to Reach Destination in Time

## Time-Indexed Layered Dynamic Programming

Cost and time are two competing objectives here — the cheapest route may be too slow and the fastest too expensive — so a plain Dijkstra on cost cannot prune by time without losing optimality. The fix is to unfold the graph into layers indexed by exact arrival time: `layers[t][c]` is the minimum total passing fee of any walk that starts at city 0, respects travel times, and arrives at city `c` at exactly minute `t`. Within a fixed time layer, minimizing cost is well-defined, and arriving at a city more than once (at different times) is allowed and useful.

The recurrence is short: `layers[0][0] = passingFees[0]`, and for each `t` from 1 to `maxTime`, every edge `(x, y, dt)` with `dt <= t` relaxes both directions — reaching `y` at time `t` costs `layers[t-dt][x] + passingFees[y]`, and symmetrically for `x`. Each layer is built fresh from earlier layers, so any walk length combination is reachable without ever comparing incomparable (cost, time) pairs. All layers are kept because the final answer may arrive at the destination before `maxTime`: it is simply `min` over all `t` of `layers[t][n-1]`, with -1 when every layer holds infinity.

![Example 1's time-indexed layers relaxing along the optimal walk: city 0 at t=0 holds $5, city 1 at t=10 holds $6, city 2 at t=20 holds $8, and city 5 at t=30 holds $11, while the pricier 0 -> 3 -> 4 -> 5 branch reaches city 5 with $48 at t=26, so the answer is min = $11 inside maxTime 30.](figures/solution-time-indexed-layers.svg)

With `maxTime` at most 1000 and at most 1000 edges, the triple loop performs around a million cheap relaxations, and the `dt > t` guard skips edges that cannot fit in the elapsed time. The layered table is `O(maxTime·n)`, the dominant memory cost.

**Complexity:** `O(maxTime·E)` time (`E` = number of edges), `O(maxTime·n)` space.

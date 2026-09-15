# Solutions — Cheapest Flights Within K Stops

Two ways to keep the stop limit honest: round-limited relaxation that can
never chain more than `k + 1` edges, or a shortest-path search whose state
carries the flight count so the limit is enforced edge by edge.

## Bellman-Ford limited to k+1 rounds

Bellman-Ford relaxation has a useful property: after `r` full rounds of relaxing every edge, `dist[v]` equals the cheapest cost of reaching `v` using at most `r` edges. A route with at most `k` stops uses at most `k + 1` flights, so running exactly `k + 1` rounds — starting from `dist[src] = 0` and infinity elsewhere — leaves `dist[dst]` holding the cheapest legal fare, or infinity if no such route exists (then return `-1`).

The critical detail is snapshotting: each round relaxes from a frozen copy `ndist = dist[:]` of the previous round's array, writing improvements into `ndist`. Relaxing in place would let a path chain several edges within one round, producing routes that exceed the stop limit. With the copy, one round extends every known route by at most one edge.

Two further refinements keep it fast: if a round changes nothing (`changed` stays false), later rounds cannot change anything either, so the loop breaks early — important when the graph's shortest paths settle before the budget runs out. Non-negative prices mean no negative-cycle handling is needed; the infinity sentinel survives at `dst` exactly when the destination is unreachable within the allowance.

Example 1 runs exactly `k + 1 = 2` rounds over `flights`:

1. `dist` starts as `[0, inf, inf, inf]`; each round relaxes from a frozen copy of the previous round.
2. Round 1: only `0 -> 1` (100) is usable, giving `[0, 100, inf, inf]`.
3. Round 2: `1 -> 2` and `1 -> 3` relax to 200 and 700. The cheaper route `0 -> 1 -> 2 -> 3` (cost 400) would need `dist[2]` inside this same round, but the frozen copy still holds infinity there, so it cannot chain early.
4. After two rounds `dist[3] = 700`, the best fare within one stop.

**Complexity:** `O(k * E)` time (`k + 1` rounds over all flights), `O(n)` space for the two distance arrays.

## Dijkstra over (cost, node, flights used)

Plain Dijkstra is not enough here: the cheapest way to reach an intermediate node can be a bad way to continue, because it may have burned more of the stop budget than a slightly costlier rival. The fix is to widen the state — the min-heap holds `(cost, node, flights used)` triples, and expanding a state that has already used its `k + 1` flights is simply forbidden. Carrying the count in the state rather than in the node label is the whole trick; it is what enforces the limit.

The heap pops in cost order, so the first time `dst` surfaces its cost is final and is returned immediately. For intermediate nodes, a dominance prune replaces the usual distance array: `best[node]` records the fewest flights any already-expanded state used at that node, and a popped state with more flights than that is skipped — a strictly cheaper state with no more flights was expanded earlier, so this one can never yield a cheaper legal arrival. Without the prune the search would walk every budget-respecting walk in the graph.

That prune is what separates this from textbook Dijkstra, and it also sizes the work: each edge can be boarded from at most `k + 1` budget levels, so the heap holds at most `O(E * k)` states. The `log` factor and heap constant make this variant slower in the worst case than Bellman-Ford's strict `O(k * E)` sweep, but the early exit at `dst` and the pruning of dominated states usually settle it long before that bound.

**Complexity:** `O(E * k * log(E * k))` time in the worst case (each edge pushed once per budget level), `O(E * k)` space for the heap plus `O(n)` for the prune table.

# Solutions — Minimum Cost to Buy Apples

## Dijkstra from Every City

For a fixed start, the trip decomposes cleanly: walk to some city `j`, pay `appleCost[j]`, then return along the same route with road costs multiplied by `k`. Retracing the outbound path is optimal because any cheaper return path would have been a cheaper outbound path too; so with `d(j)` the shortest-path distance from the start, the total is `appleCost[j] + (k+1)·d(j)` — the `k+1` factor folding outbound and return travel into one weight. Buying at the start itself costs just `appleCost[start]` since `d = 0`, which is always among the candidates.

That formula turns the problem into `n` independent shortest-path computations: run Dijkstra from each city over the positive-weight road graph (binary heaps with lazy deletion — a popped entry is skipped when its distance is stale), then take the minimum of `appleCost[j] + (k+1)·dist[j]` over all cities. Road costs being at least 1 (strictly positive) is exactly the condition Dijkstra needs for correctness.

Each run is `O((n + m) log n)` with the adjacency list, and all `n` runs give `O(n(n+m) log n)`, comfortable at `n <= 1000`, `m <= 2000`. Per-start memory is the distance array and heap; the adjacency list dominates and is shared.

An easy trap is treating travel costs as symmetric-flat (adding `k·d` on top of a `2·d`-style round trip) or pruning cities by apple price before distances are known — the optimum frequently buys elsewhere because a cheap apple one hop away beats a local one.

**Complexity:** `O(n·(n+m)·log n)` time, `O(n+m)` space.

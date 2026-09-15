# Solutions — Minimum Cost of a Path With Special Roads

## Dijkstra over road endpoints

Only a handful of positions can ever matter: by hint 1, an optimal route
never needs to pause anywhere except at start, at target, or at an endpoint
of some special road — pausing anywhere else is dominated by walking straight
through that point, since walking costs the same Manhattan distance whether
or not you "stop". So collect those candidate coordinates (deduped), treat
each one as a graph node, and put a directed edge of weight
|x2 − x1| + |y2 − y1| between every ordered pair for ordinary walking, plus
one extra directed edge per special road, priced at that road's own cost.

Running Dijkstra from the start node over this tiny graph (at most
2 · 200 + 2 = 402 nodes) yields the cheapest arrival cost at target. Because
walking directly to any node is always available, every settled distance is
bounded by the direct Manhattan price, so plain `int` arithmetic is safe — no
64-bit accumulation is needed. A nearest-unvisited scan replaces the heap:
with only a few hundred nodes the O(n²) scan is negligible and keeps all
seven language ports structurally identical and iterative. Directed roads are
the crux: a road priced cheaper than its own Manhattan distance is the only
way an edge can beat walking, and roads facing the wrong direction are simply
never relaxed backwards.

**Complexity:** `O(R²)` time and `O(R)` space with `R <= 402` candidate nodes.

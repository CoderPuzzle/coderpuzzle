# Solutions — Minimum Cost to Connect Two Groups of Points

## Bitmask DP over Reached Second-Group Points

With `size2 <= 12`, the set of second-group points a prefix of first-group
points has already reached fits in a bitmask, and that is the whole state
worth tracking: `dp[i][mask]` is the minimum cost to finish the problem
given that first-group points `i, i + 1, ..., size1 - 1` still need placing
and the first-group points already placed have collectively reached exactly
`mask`. Each first-group point must send at least one edge, so the
recurrence advances it by one link at a time:
`dp[i][mask] = min over j of cost[i][j] + dp[i + 1][mask | (1 << j)]`. That
alone guarantees every first-group point gets a connection, but it only
ever looks like point `i` sends a single link — the extra links example 2
needs (first-group point 1 reaching both second-group points B and C) show
up elsewhere, in the base case.

The base case `dp[size1][mask]` fires once every first-group point has been
placed: any second-group point still missing from `mask` never got an edge
from the forward pass, so it must be force-connected now, at the cheapest
edge that reaches it from any first-group point at all —
`minToReach[j] = min over i of cost[i][j]`, precomputed once up front.
Because a first-group point may carry unlimited edges, reusing an
already-placed point to pick up one of these forced connections costs
nothing extra to allow; it is exactly what lets, say, first-group point 1
end up serving two second-group points while the forward pass only ever
threaded one link through it explicitly. The table is filled bottom-up,
`i` from `size1` down to `0`, mask over all `2^size2` values at each level,
and the answer is `dp[0][0]` — no first-group point placed yet, no
second-group point reached yet.

![On example 2's cost matrix [[1,3,5],[4,1,1],[1,5,3]], the forward pass threads one link per row — 0→A, 1→B, 2→A, advancing the reached mask 000 → 001 → 011 — and the base case force-connects still-unreached C at minToReach[2] = cost[1][2] = 1, so first-group point 1 ends up serving both B and C for the total 4.](figures/solution-reached-mask-thread.svg)

**Complexity:** `O(size1 · 2^size2 · size2)` time, `O(2^size2)` space.

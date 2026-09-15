# Solutions — Maximum Cost of Trip With K Highways

## Bitmask DP over visited sets

A trip crossing exactly `k` highways is a simple path through exactly `k + 1` distinct cities, and how far a partial trip can be extended depends only on two things: the set of cities already visited and the city currently standing at — not on the order they were visited in. With `n <= 15` that set fits in a 15-bit mask, so the state space `dp[mask][v]` = maximum toll total of a simple path visiting exactly `mask` and ending at `v` is at most `2^15 · 15` states. Each singleton `dp[1 << v][v]` starts at cost 0, since the trip may begin anywhere.

Transitions extend a path by one highway at a time: from `(mask, v)` move to any neighbour `u` with `u` not in `mask`, giving `dp[mask | 1 << u][u] = max(..., cur + toll)`. Iterating masks in increasing numeric order is automatically topological, because a transition only ever adds bits and thus moves strictly upward. Two prunes keep the sweep tight: masks with more than `k + 1` bits are skipped, and states that already hold exactly `k + 1` cities are final, so their cost is folded into the answer instead of being extended — which also means a toll of 0 never breaks anything, as feasibility is governed by the count of cities, not accumulated cost. If `k + 1 > n` no simple path can be long enough and `-1` is returned up front; `best` likewise stays `-1` when the graph offers no path of the required length.

The total transition work is, for each of the `2^n` masks, a scan over `n` endpoints plus their adjacency lists — every edge is relaxed once per mask per direction, i.e. `O(2^n · E)` overall, comfortably small at `n <= 15` and `E <= 50`. The `dp` table itself is the dominant memory.

**Complexity:** `O(2^n · (n + E))` time, `O(2^n · n)` space.

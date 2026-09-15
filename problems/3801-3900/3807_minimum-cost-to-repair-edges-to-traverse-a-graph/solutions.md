# Solutions — Minimum Cost to Repair Edges to Traverse a Graph

## Binary Search with BFS Feasibility Check

The key observation is monotonicity: choosing an amount `money` repairs exactly the edges with `w <= money`, so raising `money` only ever adds usable edges. Whether node `n - 1` is reachable from node `0` within `k` edges is therefore monotone in `money` — once feasible, it stays feasible. That makes the answer a perfect target for binary search over the range `[0, max_w]`, where `max_w` is the largest edge weight in the input.

The feasibility check `can(money)` runs a BFS from node 0 using only edges whose weight is at most `money`. Because BFS explores level by level, the recorded `dist[v]` is the minimum number of edges over all available paths to `v`. Nodes whose distance already equals `k` are not expanded, since any continuation would use more than `k` edges; the check succeeds exactly when `dist[n - 1]` is set and does not exceed `k`.

Before searching, the code tests `can(max_w)`: if even repairing every edge fails — either because node `n - 1` is unreachable at all or because every path needs more than `k` edges — the answer is `-1`. Otherwise the search invariant is that `can(hi)` holds, and the loop converges on the smallest feasible amount, which is always an actual edge weight since feasibility only changes when an edge enters or leaves the available set. The maximum weight `W` is at most `10^9`, so the search performs about 30 BFS passes.

**Complexity:** `O((n + m) log W)` time, `O(n + m)` space.

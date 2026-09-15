# Solutions — Network Recovery Pathways

## Binary Search on Score + DAG Shortest Path

A path's score is its minimum edge cost, so the candidate score S is achievable exactly when some budget-feasible path from 0 to n − 1 uses only edges of cost at least S. This feasibility is monotone — lowering S only adds edges — so the algorithm binary-searches over the sorted distinct edge costs for the largest feasible S. An initial check at S = 0 (all edges allowed) returning false means no valid path exists at any score and yields −1.

Each check is a shortest-path DP over the DAG: a topological order is computed once up front by Kahn's algorithm, then dist[u] is relaxed in that order using only edges with cost ≥ S and skipping both offline sources and offline targets, so invalid nodes never propagate. The candidate is feasible when dist[n − 1] ≤ k. Total cost is minimized per threshold, which is the right witness: if the cheapest restricted path exceeds the budget, no restricted path fits.

Costs up to 10^9 and k up to 5 × 10^13 fit in native integers, and the appended traversal of the topological order is linear per check. An empty edge list short-circuits through the S = 0 infeasibility unless the trivial single-hop case applies; the distinct-cost sort keeps the binary search range tight regardless of duplicate weights.

**Complexity:** `O((n + m) log m)` time, `O(n + m)` space.

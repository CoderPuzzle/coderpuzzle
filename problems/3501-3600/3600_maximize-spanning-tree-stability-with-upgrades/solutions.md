# Solutions — Maximize Spanning Tree Stability with Upgrades

## Binary Search on Stability + DSU Feasibility

If a stability of x is achievable, every smaller value is too, which makes the answer monotone and binary-searchable over the range [1, 200001] — the upper bound is 2 × 10^5 because strengths are at most 10^5 and an upgrade at most doubles one. The search keeps the last known feasible value in lo and returns it.

feasible(x) decides one candidate with a union-find. First every must-edge is forced in: any must-edge with strength below x fails immediately, and a must-edge whose endpoints are already connected fails too (a cycle would break the spanning-tree property — this is how example 3 returns −1). Then optional edges with strength at least x join for free, and finally optional edges that reach x only after being upgraded (s < x ≤ 2s) are unioned one by one, each successful union consuming one of the k available upgrades; exceeding k fails. The candidate is feasible precisely when all n nodes end up connected.

Calling feasible(1) first cleanly separates the −1 case: with threshold 1 every edge qualifies (possibly after upgrade), so failure there means the must-edges are contradictory or the graph simply cannot be spanned. Each check touches every edge a constant number of times with near-inverse-Ackermann finds, so the whole search costs about 18 passes over the edge list.

**Complexity:** `O(m · α(n) · log S)` time (S = 2 × 10^5 strength bound), `O(n)` space.

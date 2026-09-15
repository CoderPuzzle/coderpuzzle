# Solutions — Minimize Maximum Component Cost

## Binary Search on Cost + Union-Find Component Count

For a candidate threshold t, keep only the edges of weight at most t and count the connected components with a union-find starting from n singletons. Splitting the graph by cutting all heavier edges yields exactly that many components, and any further removal only increases the count — so t is feasible precisely when the count is at most k. Feasibility is monotone in t (raising the threshold adds edges, merging components), which makes binary search over the sorted distinct edge weights valid; the answer is always one of those weights or 0, because between consecutive weights nothing changes.

Two shortcuts guard the ends: if k ≥ n the answer is 0 (every node may sit alone), and if feasible(0) — no edges kept at all, since all weights are ≥ 1 — the count is n and the same 0 applies. Otherwise the search converges on the smallest distinct weight whose subgraph has at most k components, using the standard lo/hi narrowing over index space.

Each feasibility check is one pass over the edges with path-halving finds; the sort of distinct weights plus the log-many checks dominates the runtime. The input graph is guaranteed connected, but the code never relies on that beyond the component counting.

**Complexity:** `O(m log m + m · α(n) · log m)` time, `O(n + m)` space.

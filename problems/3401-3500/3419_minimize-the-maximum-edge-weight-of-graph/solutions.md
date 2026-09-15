# Solutions — Minimize the Maximum Edge Weight of Graph

## Binary Search on the Weight Limit with Reversed-Graph Reachability

Invert every edge and the requirement "node 0 is reachable from every node" becomes "node 0 reaches every node" in the reversed graph — a plain single-source reachability question. The maximum edge weight of the kept subgraph is monotone: if keeping only edges of weight ≤ `x` lets 0 reach everyone, any larger limit does too. So binary search over `[0, maxW]`, where each test runs a DFS (explicit stack) from node 0 over reversed edges with `w ≤ limit` and checks whether all `n` nodes were seen; the first feasible limit is the answer, and infeasibility at `maxW` returns `-1` since even keeping everything fails.

The threshold constraint — each node keeps at most `threshold` outgoing edges — never binds, and the solution justly ignores it. Reachability from 0 is witnessed by any DFS/BFS tree of the reversed graph, in which every non-root node keeps exactly one outgoing edge (toward its parent) and node 0 keeps none; since `threshold ≥ 1`, such a spanning tree always satisfies the degree condition. Hence the limit is decided purely by connectivity.

One subtlety: the feasibility test uses `w <= limit` against weights up to `10⁶`, so the search runs about 20 iterations, each an `O(n + m)` traversal. Multi-edges between the same node pair (with distinct weights) are harmless — extra edges only add DFS branches, never false reachability, since a path through them is a genuine directed path.

Edge cases: node 0 itself is trivially reached (seeded as seen before the stack walk); graphs where some node cannot reach 0 at any weight yield `-1` via the up-front check at `maxW`; and since every weight is at least 1, a limit of 0 isolates node 0, so with `n ≥ 2` the binary search can never return 0 — the search handles all of this uniformly.

**Complexity:** `O((n + m) log W)` time, `O(n + m)` space, for `W` the maximum edge weight.

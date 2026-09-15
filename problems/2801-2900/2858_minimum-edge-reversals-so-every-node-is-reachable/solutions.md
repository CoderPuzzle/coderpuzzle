# Solutions — Minimum Edge Reversals So Every Node Is Reachable

## Rerooting Tree DP

Viewing the underlying undirected tree, making node `i` the root of all directed reachability means every tree edge must point away from `i` along the root-to-leaf direction; the cost for root `i` is the number of original edges pointing the wrong way. Computing that independently per node would be quadratic, so the solution computes it for one root and then _reroots_: moving the root across an edge changes the cost by exactly +1 or -1, depending on that edge's direction.

Each undirected edge is stored twice with a traversal cost: following `u -> v` costs 0 (the original direction), following `v -> u` costs 1 (a reversal). A BFS from node 0 records parents and a processing order. The first pass walks that order in reverse, children before parents: `dp[x]`, the reversals needed for `x` to reach everything in its subtree, accumulates `dp[y] + cost` for each child `y`, where `cost` is the price of traversing the edge from `x` toward `y`. Then `dp[0]` is the full answer for root 0.

The second pass walks the order forward, parents before children, pushing answers down: `ans[y] = ans[x] + 1` if the edge is originally directed `x -> y` (cost 0 from `x`'s side — from `y` as root it now points the wrong way), and `ans[x] - 1` if it is directed `y -> x` (from `y`'s side it is already correct, one reversal saved). Every non-root node's answer is derived from its parent's in constant time, so the two sweeps together are linear. Iteration over the BFS order replaces recursion, which matters at `n = 10^5` where deep chains would overflow the call stack.

**Complexity:** `O(n)` time, `O(n)` space.

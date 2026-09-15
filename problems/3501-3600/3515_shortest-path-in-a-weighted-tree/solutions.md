# Solutions — Shortest Path in a Weighted Tree

## Euler Tour + Fenwick Tree

In a tree there is exactly one path from the root to any node, so the root-to-node distance can only change through edge-weight updates. Changing the weight of an edge (u, v) from w to w' shifts the distance of every node in the subtree hanging below the deeper endpoint by the same delta, and leaves all other nodes untouched. An Euler tour (entry time tin and exit time tout from an iterative DFS) flattens the tree so that this subtree is the contiguous index range [tin, tout], turning each update into a range addition.

Initial distances are computed once during the DFS and stored in base[x]. A Fenwick tree laid over the Euler order supports range add / point query: an update on edge (u, v) finds the child endpoint (the one whose parent is the other endpoint) via the parent array, computes delta = new weight − old weight, and adds delta at tin[child] and −delta at tout[child] + 1. A distance query for node x is then just base[x] plus the prefix sum up to tin[x], which collects exactly the deltas of all ancestor edges that were ever updated.

The DFS is iterative (explicit stack with enter/exit states) so 10^5-deep chains cannot overflow recursion, and the Fenwick tree is a plain array of size n + 2 since tout values run up to n. A query on the root returns base[1] + 0 = 0 because no Euler range covers it from a child-side update.

**Complexity:** `O(n + q log n)` time, `O(n)` space.

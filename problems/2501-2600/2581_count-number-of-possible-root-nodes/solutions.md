# Solutions — Count Number of Possible Root Nodes

## Rerooting with a Guess Set

For a fixed root, a guess `[u, v]` is correct exactly when `u` is the parent of `v` in the rooted tree. Computing that for all `n` roots naively costs O(n) per root after an O(n) traversal — O(n²) overall, too slow for n = 10^5. The rerooting insight collapses the cost: when the root moves across an edge from `p` to its child `u`, only that one edge changes direction. Every other edge keeps its parent–child orientation, so the correct-guess count changes by at most one: the guess `(p, u)` (correct when rooted at `p`) becomes wrong, and the reversed guess `(u, p)` becomes correct.

Concretely, store the guesses in a hash set of tuples for O(1) direction checks. Root the tree at node 0 with an iterative DFS that records each node's parent and a visit order where parents appear before children. The correct count for root 0 is one pass over edges: for each node `v != 0`, add one if `(parent[v], v)` is guessed. Then process nodes in DFS order (skipping the root): the count for `u` equals the count of its parent `p`, minus 1 if `(p, u)` was guessed, plus 1 if `(u, p)` was guessed; count every node whose total reaches `k`.

The parent-before-child order matters: when a node's count is computed, its parent's count is already final, so a single linear pass suffices — this is rerooting without recursion, which also sidesteps Python's recursion limit on deep trees. Duplicate guesses cannot occur per the constraints, and every guess names a real tree edge, so both set lookups are the only per-node work. Edge case `k = 0` makes every root valid, which the `>= k` comparison handles by counting all `n` nodes.

**Complexity:** `O(n + g)` time (where `g` is the number of guesses), `O(n + g)` space.

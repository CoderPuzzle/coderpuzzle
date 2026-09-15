# Solutions — All Paths From Source to Target

## DFS backtracking

The graph is acyclic, so every walk from node 0 is a simple path and DFS can never loop; enumerate paths with a depth-first traversal that carries the current path in a list. Starting from node 0, recurse into each neighbor in turn; upon arriving at node `n - 1`, snapshot a copy of the current path into the results and return — the target has no outgoing edges in a DAG-path context, so there is nothing further to explore from it.

Backtracking keeps the traversal honest: before recursing into a neighbor, append it; after the recursive call returns, pop it, so sibling branches each see a clean path. Dead ends (nodes other than the target with no useful continuations) simply fall through the neighbor loop and return without recording anything. Visiting each node's neighbors in the order they appear in `graph[node]` produces exactly the path ordering the judge expects.

![The example DAG with its two recorded paths 0 → 1 → 3 and 0 → 2 → 3.](figures/solution-dag-paths.svg)

There is no need for a visited set: acyclicity means no path revisits a node, and paths legitimately share prefixes. The cost is inherently output-driven — a complete DAG on `n` nodes admits up to `2^(n-2)` distinct paths, each up to `n` nodes long, so the runtime can be exponential in `n`; the bound `n <= 15` keeps this small.

**Complexity:** `O(n * 2^n)` time in the worst case, `O(n)` space for the recursion stack and current path, excluding the output list.

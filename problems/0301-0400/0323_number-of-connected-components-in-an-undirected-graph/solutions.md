# Solutions — Number of Connected Components in an Undirected Graph

## union_find

Every node begins as its own component — `count` starts at `n` with each node its own parent. Processing the edges one by one, each edge that links two nodes whose roots differ merges two distinct components into one and decrements the count; an edge whose endpoints already share a root is redundant for connectivity and changes nothing. When all edges are consumed, the count is the answer, with no traversal of the graph needed.

The parent array implements a disjoint set union. `find` walks parent pointers up to the root while path-halving — `parent[x] = parent[parent[x]]` — which splices every other node on the path directly under its grandparent, flattening the tree as it goes so repeated finds get progressively cheaper. `parent[ra] = rb` glues one root under the other after the roots have been checked distinct.

This counting style is why union-find beats DFS/BFS here in both brevity and cache behavior: there is no adjacency list to build, no recursion stack, and self-loops or repeated edges would be absorbed harmlessly since their endpoints already share a root. Edge cases fall out directly — an empty edge list returns `n`, and isolated nodes stay their own components.

**Complexity:** `O(E · α(n))` time — near-linear under compression — with `O(n)` space.

## dfs

Components counted the direct way: build an undirected adjacency list — each edge appended in both directions, so either endpoint can reach the other — then sweep the nodes `0..n-1`. Every unvisited node the sweep finds starts a new component: increment the count and flood everything reachable from it. Each flood absorbs exactly one component, and each node is claimed by exactly one flood, so the number of launches is the answer.

The flood is an explicit-stack DFS, so there is no recursion-depth concern. Popping a node walks its neighbor list; every unvisited neighbor is marked visited and pushed immediately. Marking at push time rather than at pop time keeps any node from being stacked twice, so each node is popped once and each adjacency list is read once over the whole run — the linear total reflects the edge-list representation, where reading one node's neighbors touches only its actual edges rather than a full matrix row.

**Complexity:** `O(n + E)` time, `O(n + E)` space — the adjacency list plus the visited array, with the stack holding at most all `n` nodes in the worst case.

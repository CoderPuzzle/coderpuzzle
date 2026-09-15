# Solutions — Find if Path Exists in Graph

Both readings answer the same question — do `source` and `destination`
sit in one connected piece of the graph? — but they pay for it
differently. The traversal takes the question literally: build the
adjacency list, walk outward from `source`, and see whether the wavefront
ever touches `destination`. Union-find never builds a graph at all; it
merges the two endpoints of each edge as it reads them, and the answer
falls out of a single root comparison at the end.

## Breadth-first search over an adjacency list

Build the graph as an adjacency list, adding each undirected edge in both
directions. Starting from `source`, a breadth-first search expands the
wavefront one hop at a time; the moment a neighbor equals `destination`,
the path exists and the search returns immediately. The visited array
guarantees each vertex is expanded at most once, so the search visits
exactly the connected component of `source`.

Because the graph is unweighted, breadth-first order also discovers
vertices in order of distance from `source`, though here only reachability
matters, not the length of the path. A `source == destination` shortcut
returns `true` before the queue is even built; when the queue finally
empties without ever reaching `destination`, the two vertices lie in
different components and the answer is `false`.

Every edge is scanned once while building the adjacency list and again
during the traversal, and the visited array plus the queue use space
proportional to the vertex count.

**Complexity:** `O(n + e)` time, `O(n + e)` space, where `n` is the number
of vertices and `e` is the number of edges.

## Union-find over the edge list

Reachability in an undirected graph is exactly membership in the same
connected component, and connected components are precisely what a
disjoint set union tracks. So the edge list can be consumed as it stands:
each `[u, v]` merges the component of `u` with the component of `v`, and
once the last edge is folded in, `source` reaches `destination` if and
only if the two now resolve to a common root.

The `parent` array is the whole structure — every vertex starts as its
own root. `find` follows parent pointers upward while path-halving
(`parent[x] = parent[parent[x]]`) splices every second node on the walk
directly beneath its grandparent, so the trees flatten as a side effect of
being searched and later lookups get cheaper. Confirming two roots differ
before writing `parent[ru] = rv` keeps the merge from making a root point
at itself through a cycle.

The encoding is what makes this the tighter fit: no adjacency list, no
queue, no visited array — one integer array and one pass over the edges.
The `source == destination` case needs no shortcut, since a vertex always
finds itself as its own root, and awkward inputs are absorbed silently: a
repeated edge finds both endpoints already under one root and does
nothing. The order the edges arrive in never matters, because union is
commutative and the final partition is the same either way.

**Complexity:** `O(n + e · α(n))` time — effectively linear, `α` being the
inverse Ackermann function — and `O(n)` space for the parent array, where
`n` is the number of vertices and `e` is the number of edges.

# Solutions — All Paths from Source Lead to Destination

## Iterative three-color DFS

Build the adjacency list, then walk it from `source` with the classic
three-color cycle check: every node is white (unvisited), gray (on the
current DFS path), or black (fully verified safe). A leaf -- a node with
no outgoing edges -- is safe only if it is `destination`; `destination`
itself must also be a true leaf, so the moment it is reached with any
outgoing edge, the answer is false, because a path through it keeps
going and can only end somewhere else, or loop forever. Reaching a gray
node means the current path has looped back on itself -- a cycle, hence
false. Reaching a black node needs no further work, since an earlier
branch already proved everything below it safe.

The traversal uses an explicit stack of `(node, next child index)`
frames rather than recursion, so the call depth never depends on how
deep the graph goes. Each frame advances its own child pointer one edge
at a time; when a frame has walked every outgoing edge of its node
without hitting a cycle or a bad leaf, that node is marked black and
popped. The search returns false as soon as any branch proves unsafe,
and returns true only once the whole reachable subgraph from `source`
has been marked black.

**Complexity:** `O(n + e)` time, `O(n + e)` space, where `n` is the
number of nodes and `e` is the number of edges.

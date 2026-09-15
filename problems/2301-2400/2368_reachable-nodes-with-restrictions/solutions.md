# Solutions — Reachable Nodes With Restrictions

## Single breadth-first traversal

In a tree there is exactly one path between any two nodes, so "reachable
from node 0 without visiting a restricted node" is simply the connected
component of node 0 in the graph that remains after deleting every
restricted node — and a component is found with one traversal. The answer
is the number of nodes that sweep visits.

The mechanics are standard breadth-first search: build adjacency lists from
the `n - 1` edges, mark node 0 visited, and repeatedly dequeue a node,
count it, and enqueue each unvisited neighbor not in the restricted set. A
visited array keeps each node from being processed twice; the restricted
check acts as a wall, since a blocked node can never be entered even as an
intermediate. Depth-first recursion would work identically but risks call
stacks thousands of levels deep on path-shaped trees of `10⁵` nodes, so the
explicit queue is the safer shape.

Every node enters and leaves the queue at most once and every edge is
scanned from both ends, giving linear time in the size of the tree.

**Complexity:** `O(n)` time, `O(n)` space.

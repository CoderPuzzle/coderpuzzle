# Solutions — Maximum Distinct Path Sum in a Binary Tree

A path in a tree is fully described by its two endpoints, so trying every
node as a starting point and walking outward covers every candidate path
exactly once.

## DFS from every starting node

Any valid path is a simple path between two nodes, and the tree has a unique
route between any pair. Root the search at each node in turn and run a DFS
that is allowed to move to the left child, the right child, or the parent;
that reachability is what makes a path that bends upward through a subtree
branch discoverable, not just downward rays. The only restriction is
distinctness: the DFS refuses to step into a node whose value is already on
the current path. Since every ancestor, including the parent, sits on the
current path, the seen set alone prevents the search from turning back — no
separate "visited parent" bookkeeping is needed.

The current path's sum is carried alongside the traversal, and the running
best is updated whenever a node is entered, which covers every single-node
path as well. A node is entered at most once per starting point because the
underlying graph is a tree, so the whole search costs O(n) per start and
O(n²) overall. The traversal is written iteratively with enter/exit markers:
the seen set holds exactly the values on the live path, values are removed on
exit, and a 1000-node chain cannot exhaust the call stack of any of the
target runtimes.

**Complexity:** `O(n²)` time, `O(n)` space.

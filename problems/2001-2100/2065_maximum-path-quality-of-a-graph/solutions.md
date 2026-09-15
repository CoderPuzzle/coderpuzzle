# Solutions — Maximum Path Quality of a Graph

## Bounded walk backtracking

Build the undirected adjacency list, then search every walk from node `0` whose
elapsed time stays within `maxTime`. Visit counts distinguish a node's first
arrival from later visits: add its value only when its count changes from zero
to one, recurse, and restore the count while backtracking. Every time the walk
returns to node `0`, its current unique-node quality is a valid candidate,
including the initial zero-edge path.

Every edge costs at least 10 seconds and every node has degree at most four, so
the recursion has depth at most `maxTime / 10` and branching factor at most
four. Repeated nodes remain available because only elapsed time bounds a walk;
the count array controls scoring rather than forbidding revisits.

**Complexity:** `O(4^(maxTime / 10))` time and `O(n + m + maxTime / 10)` space.

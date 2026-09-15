# Solutions — Find Eventual Safe States

Both sweeps settle the same induction: a node is cycle-free exactly when
every node it points at is. The DFS asks the question in the graph's own
direction, walking out from each node and carrying the verdict home on an
explicit stack, memoized so no node is judged twice. The peel flips the
question around instead, running the induction backwards over an
edge-reversed graph as a plain count, where every safe node falls out of
one queue-driven pass and cycles need no special casing.

## Memoized DFS with safe/unsafe states

The definition reads as a recursion: a node is cycle-free when every node
it points at is cycle-free, and a node with nothing to point at is
cycle-free for free. So walk. From each unjudged node, follow out-edges
depth-first and let the verdict percolate back up the path, cached in a
state array so that no node is ever judged twice.

Four states carry the bookkeeping. A node is unvisited before its walk
starts, visiting while it sits somewhere on the current path, and safe or
unsafe once judged. A frame closes as safe when every out-neighbor came
back safe, and as unsafe the moment any of them did — one bad successor
is enough to doom a node, so a single flag per frame carries the news
upward.

Dispatch on the out-neighbor's state decides each edge. Finished
neighbors are already memoized: a safe one clears the bar, an unsafe one
raises the frame's flag. A visiting neighbor is a back edge — the walk
has come around onto its own path, so a cycle runs through it, and the
flag goes up. As the frames unwind, every node stacked between the
revisited one and the tip pops unsafe, and each pop hands its flag to the
node below: first the cycle itself, then everything that merely feeds
into it.

The stack is explicit — an array of node numbers, with the child cursor
and the danger flag indexed per node, since a node occupies at most one
frame — because a chain of 10^4 nodes would overflow real recursion in
most languages here. Each node is pushed once and each edge examined
once, so the auxiliary storage is the three state arrays plus a stack of
at most `V` nodes, and the closing scan over the state array returns
safe indices in ascending order with no sorting step.

On `graph = [[1],[2],[0,3],[4],[],[3]]` the walk from node 0 goes 0, 1,
2, and 2's first out-neighbor 0 is visiting, so its flag rises. The
detour through 3 and 4 pops both safe; then 2, 1 and 0 unwind unsafe in
turn, each handing danger to the node below. Nodes 1 through 4 meet their
turns already judged, and node 5 walks to 3, finds it safe, and finishes
safe. The ascending safe scan reports `[3, 4, 5]`.

**Complexity:** `O(V + E)` time, `O(V)` space.

## Reverse-graph topological peel

A node is unsafe exactly when it lies on a directed cycle or can reach one; safe nodes are those from which every path eventually terminates. Running a topological peel on the reversed graph captures this directly: compute each node's out-degree, build the reversed adjacency list, and seed a queue with the terminal nodes (out-degree 0). Repeatedly pop a node, mark it safe, and decrement the out-degree of every predecessor — a predecessor enters the queue only when all of its outgoing neighbors have been proven safe, which is precisely the definition of a safe node.

![The example graph: the 0 → 1 → 2 cycle keeps three nodes unsafe while the peel proves 2, 4, 5, 6 safe.](figures/solution-safe-states.svg)

This is Kahn's algorithm run on the transpose: nodes remaining unpeeled at the end are exactly those entangled in cycles (including through reachable cycles), so they stay unsafe. A self-loop is handled naturally — its edge contributes 1 to the node's own out-degree and is only decremented when the node itself is peeled, which can never happen first, so self-looped nodes never become safe.

The final answer is collected by scanning indices in ascending order and keeping the marked ones, which yields the required sorted order without an explicit sort. Edges are traversed once when building the transpose and once when peeling.

**Complexity:** `O(V + E)` time, `O(V + E)` space for the reversed adjacency, out-degree array, and queue.

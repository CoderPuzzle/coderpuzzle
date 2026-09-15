# Solutions — All Ancestors of a Node in a Directed Acyclic Graph

Both approaches assemble the same object — one ancestor set per node,
holding exactly the nodes that can reach it. The reversed-graph search
works row by row: flip every edge and a breadth-first walk from a node
marks its set directly, but each of the `n` rows pays for its own traversal
of the graph. The topological propagation shares that work instead:
processing the nodes so every parent lands before its children lets each
set be folded from sets already finished, and one ordered sweep completes
every row at once.

## BFS on the reversed graph

Flipping every edge turns "who can reach v" into "who is reachable from
v": a breath-first search from each node over the reversed adjacency
marks exactly its ancestors. Emitting the marked indices in ascending
order satisfies the sorted requirement for free, and the DAG guarantee
keeps every search finite without bookkeeping.

**Complexity:** `O(n * (n + E))` time for `n` nodes and `E` edges,
`O(n + E)` space.

## Topological propagation

Kahn's algorithm over the graph's natural direction dequeues a node only
once every incoming edge has been consumed — that is, once all of its
direct parents have been processed and their ancestor sets are final. The
fold then costs no traversal at all: the node's set is the union of each
parent together with that parent's set, one word-wise OR per incoming edge.
Nodes nothing reaches into fold to the empty set, and every other row is
finished the moment its node is dequeued.

The sets are bitsets, one per node, so the answer is read straight off the
bits: scanning each node's set in ascending order emits exactly the sorted
list the statement asks for.

**Complexity:** `O(n * (n + E))` time for `n` nodes and `E` edges,
`O(n²)` space for the `n` ancestor sets.

# Solutions — Count Visited Nodes in a Directed Graph

## Functional Graph Path Walking

Each node has exactly one outgoing edge, so the graph is a functional graph: every walk eventually enters a cycle and then loops forever. The number of distinct nodes visited from `x` is the length of the "tail" from `x` plus the length of the cycle that tail drains into; nodes already on a cycle have answer exactly the cycle length. That structure is why repeatedly simulating from every start would be quadratic — walks share tails and cycles heavily — and why memoizing by component is the fix.

The algorithm keeps a per-node state: unvisited, on the current walk, or resolved with a known answer. From each still-unresolved start, follow edges while the current node is unvisited, marking nodes as on-path and recording the walk order. The walk stops in one of two ways. If it lands on a node of the current walk, a new cycle was found: the position of that node in the recorded path splits it into tail and cycle — cycle members get the cycle length, and each earlier tail node gets the cycle length plus its remaining distance to the cycle. If instead it lands on an already-resolved node, the entire new walk is a tail into a known component, and every node on it gets the resolved node's answer plus its distance from the end of the walk.

![edges = [1,2,0,0] as a 3-cycle 0-1-2 with node 3 hanging off it: cycle nodes answer 3, node 3 answers 3 + 1 = 4.](figures/solution-functional-graph.svg)

Because every node is marked on-path exactly once and resolved exactly once across all starts, the total work is linear even though a single scan like locating the cycle's entry inside the path is a linear search — it is paid once per walk, and walks partition the nodes. Already-resolved starts are skipped, so each weakly connected component is fully priced the first time it is entered.

**Complexity:** `O(n)` time, `O(n)` space.

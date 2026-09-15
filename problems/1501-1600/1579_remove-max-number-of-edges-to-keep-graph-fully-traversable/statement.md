# Remove Max Number of Edges to Keep Graph Fully Traversable

## Description

Alice and Bob share an undirected graph of `n` nodes and three kinds of
edges:

- **Type 1** can be traversed by Alice only.
- **Type 2** can be traversed by Bob only.
- **Type 3** can be traversed by both Alice and Bob.

You are given `edges`, where `edges[i] = [typei, ui, vi]` is a bidirectional
edge of type `typei` between nodes `ui` and `vi`.

Find the maximum number of edges you can remove so that, after removal, the
graph can still be fully traversed by both Alice and Bob. The graph is fully
traversed by a person if, starting from any node, they can reach every other
node using only edges that person is allowed to use.

Return the maximum number of edges that can be removed, or `-1` if the graph
cannot be made fully traversable by both Alice and Bob.

### Example 1

![diagram](figures/1579-1.svg)

```text
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: Removing the two edges [1,1,2] and [1,1,3] leaves the graph
fully traversable by both Alice and Bob. Removing any additional edge
breaks that, so 2 is the maximum.
```

### Example 2

![diagram](figures/1579-2.svg)

```text
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Removing any single edge makes the graph no longer fully
traversable by both Alice and Bob, so no edge can be removed.
```

### Example 3

![diagram](figures/1579-3.svg)

```text
Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In this graph Alice can never reach node 4 from the other
nodes, and Bob can never reach node 1. No removal (or lack of one) fixes
that, so full traversal by both is impossible.
```

### Constraints

- `1 <= n <= 10⁵`
- `1 <= edges.length <= min(10⁵, 3 * n * (n - 1) / 2)`
- `edges[i].length == 3`
- `1 <= typei <= 3`
- `1 <= ui < vi <= n`
- All tuples `(typei, ui, vi)` are distinct.

## Hints

### Hint 1

Think in terms of building the final network rather than removing extra
edges.

### Hint 2

Suppose you already have the final graph, after the extra edges are
removed. Look only at the subgraph of edges Alice can traverse — what
structure must it have, and how many edges can it contain at most?

### Hint 3

Use a disjoint set union (Union-Find) structure for Alice and another one
for Bob.

### Hint 4

Always add Type 3 edges first, then use the type-specific edges to connect
whatever is still isolated.

# Design Graph With Shortest Path Calculator

## Description

There is a directed weighted graph that consists of `n` nodes numbered from
`0` to `n - 1`. The edges of the graph are initially represented by the given
array `edges`, where `edges[i] = [fromᵢ, toᵢ, costᵢ]` indicates that there is
an edge from `fromᵢ` to `toᵢ` with cost `costᵢ`.

Implement the `Graph` class:

- `Graph(int n, int[][] edges)` Initializes the object with `n` nodes and the
  given edges.
- `void addEdge(int[] edge)` Adds an edge to the graph, where
  `edge = [from, to, cost]`. It is guaranteed that there is no edge between
  the two nodes before adding this one.
- `int shortestPath(int node1, int node2)` Returns the minimum cost of a
  path from `node1` to `node2`. If no path exists, return `-1`. The cost of a
  path is the sum of the costs of the edges in the path.

### Example 1

```text
Input:
["Graph", "shortestPath", "shortestPath", "addEdge", "shortestPath"]
[[4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]], [3, 2], [0, 3], [[1, 3, 4]], [0, 3]]
Output: [null, 6, -1, null, 6]
Explanation:
Graph g = new Graph(4, [[0, 2, 5], [0, 1, 2], [1, 2, 1], [3, 0, 3]]);
g.shortestPath(3, 2); // return 6. The path 3 -> 0 -> 1 -> 2 costs 3 + 2 + 1 = 6.
g.shortestPath(0, 3); // return -1. There is no path from 0 to 3.
g.addEdge([1, 3, 4]); // add an edge from node 1 to node 3.
g.shortestPath(0, 3); // return 6. The path 0 -> 1 -> 3 costs 2 + 4 = 6.
```

### Constraints

- `1 <= n <= 100`
- `0 <= edges.length <= n * (n - 1)`
- `edges[i].length == edge.length == 3`
- `0 <= fromᵢ, toᵢ, from, to, node1, node2 <= n - 1`
- `1 <= costᵢ, cost <= 10⁶`
- There are no repeated edges and no self-loops in the graph at any point.
- At most `100` calls will be made to `addEdge`.
- At most `100` calls will be made to `shortestPath`.

### Follow-up

With only `100` nodes and `100` queries, recomputing from scratch per query
is already fast — when would that stop being true, and what would you cache?

## Hints

### Hint 1

Edges only ever get added — never removed or reweighted — so the graph is a
plain adjacency list that `addEdge` appends to in constant time. All the real
work lives in the query.

### Hint 2

Costs are positive, which makes the query a textbook single-source shortest
path: settle nodes in order of their tentative distance, each exactly once.

### Hint 3

A min-heap of `(distance, node)` gives that order lazily. Pop, skip if the
distance is stale, relax the outgoing edges, and stop the moment `node2` is
popped — no need to finish the rest of the graph.

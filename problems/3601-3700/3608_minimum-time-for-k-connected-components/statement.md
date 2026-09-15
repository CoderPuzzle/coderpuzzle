# Minimum Time for K Connected Components

## Description

You are given an integer `n` and an undirected graph with `n` nodes labeled
from `0` to `n - 1`. This is represented by a 2D array `edges`, where
`edges[i] = [ui, vi, timei]` indicates an undirected edge between nodes `ui`
and `vi` that can be removed at `timei`.

You are also given an integer `k`.

Initially, the graph may be connected or disconnected. Your task is to find
the minimum time `t` such that after removing all edges with `time <= t`, the
graph contains at least `k` connected components.

Return the minimum time `t`.

A connected component is a subgraph of a graph in which there exists a path
between any two vertices, and no vertex of the subgraph shares an edge with a
vertex outside of the subgraph.

### Example 1

```text
Input: n = 2, edges = [[0,1,3]], k = 2
Output: 3
Explanation: Initially, there is one connected component {0, 1}.
At time = 1 or 2, the graph remains unchanged.
At time = 3, edge [0, 1] is removed, resulting in k = 2 connected components {0}, {1}. Thus, the answer is 3.
```

![A single edge of time 3 joins nodes 0 and 1; removing it at t = 3 leaves the two required components.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, edges = [[0,1,2],[1,2,4]], k = 3
Output: 4
Explanation: Initially, there is one connected component {0, 1, 2}.
At time = 2, edge [0, 1] is removed, resulting in two connected components {0}, {1, 2}.
At time = 4, edge [1, 2] is removed, resulting in k = 3 connected components {0}, {1}, {2}. Thus, the answer is 4.
```

![Node 1 joins nodes 0 and 2 with edges of time 2 and 4; both are gone by t = 4, leaving three singletons.](figures/example-2.svg)

### Example 3

```text
Input: n = 3, edges = [[0,2,5]], k = 2
Output: 0
Explanation: Since there are already k = 2 disconnected components {1}, {0, 2}, no edge removal is needed. Thus, the answer is 0.
```

![Node 1 is already isolated from the pair {0, 2}, so k = 2 components exist at t = 0 and the answer is 0.](figures/example-3.svg)

### Constraints

- `1 <= n <= 10^5`
- `0 <= edges.length <= 10^5`
- `edges[i] = [ui, vi, timei]`
- `0 <= ui, vi < n`
- `ui != vi`
- `1 <= timei <= 10^9`
- `1 <= k <= n`
- There are no duplicate edges.

## Hints

### Hint 1

Binary-search the smallest t such that, after removing all edges with time <= t, the graph splits into at least k connected components.

### Hint 2

Equivalently, process the edges in descending time order with a union-find: as the threshold t drops, keep the edges with time greater than t and watch the component count grow.

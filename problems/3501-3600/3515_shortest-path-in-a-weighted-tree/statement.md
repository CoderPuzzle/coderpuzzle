# Shortest Path in a Weighted Tree

## Description

You are given an integer `n` and an undirected, weighted tree rooted at node
`1` with `n` nodes numbered from `1` to `n`. This is represented by a 2D array
`edges` of length `n - 1`, where `edges[i] = [ui, vi, wi]` indicates an
undirected edge from node `ui` to `vi` with weight `wi`.

You are also given a 2D integer array `queries` of length `q`, where each
`queries[i]` is either:

- `[1, u, v, w']` — Update the weight of the edge between nodes `u` and `v` to
  `w'`, where `(u, v)` is guaranteed to be an edge present in `edges`.
- `[2, x]` — Compute the shortest path distance from the root node `1` to node
  `x`.

Return an integer array `answer`, where `answer[i]` is the shortest path
distance from node `1` to `x` for the `i`-th query of `[2, x]`.

### Example 1

```text
Input: n = 2, edges = [[1,2,7]], queries = [[2,2],[1,1,2,4],[2,2]]
Output: [7,4]
Explanation:
Query [2,2]: The shortest path from root node 1 to node 2 is 7.
Query [1,1,2,4]: The weight of edge (1,2) changes from 7 to 4.
Query [2,2]: The shortest path from root node 1 to node 2 is 4.
```

![Nodes 1 and 2 joined by an edge of weight 7 that is later updated to 4.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, edges = [[1,2,2],[1,3,4]], queries = [[2,1],[2,3],[1,1,3,7],[2,2],[2,3]]
Output: [0,4,2,7]
Explanation:
Query [2,1]: The shortest path from root node 1 to node 1 is 0.
Query [2,3]: The shortest path from root node 1 to node 3 is 4.
Query [1,1,3,7]: The weight of edge (1,3) changes from 4 to 7.
Query [2,2]: The shortest path from root node 1 to node 2 is 2.
Query [2,3]: The shortest path from root node 1 to node 3 is 7.
```

![Root 1 with children 2 and 3; edge (1,3) changes from 4 to 7, so d(3) goes 4 to 7.](figures/example-2.svg)

### Example 3

```text
Input: n = 4, edges = [[1,2,2],[2,3,1],[3,4,5]], queries = [[2,4],[2,3],[1,2,3,3],[2,2],[2,3]]
Output: [8,3,2,5]
Explanation:
Query [2,4]: The shortest path from root node 1 to node 4 consists of edges (1,2), (2,3), and (3,4) with weights 2 + 1 + 5 = 8.
Query [2,3]: The shortest path from root node 1 to node 3 consists of edges (1,2) and (2,3) with weights 2 + 1 = 3.
Query [1,2,3,3]: The weight of edge (2,3) changes from 1 to 3.
Query [2,2]: The shortest path from root node 1 to node 2 is 2.
Query [2,3]: The shortest path from root node 1 to node 3 consists of edges (1,2) and (2,3) with updated weights 2 + 3 = 5.
```

![Chain 1 - 2 - 3 - 4 with weights 2, 1, 5; updating edge (2,3) to 3 lifts d(3) from 3 to 5.](figures/example-3.svg)

### Constraints

- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] == [ui, vi, wi]`
- `1 <= ui, vi <= n`
- `1 <= wi <= 10^4`
- The input is generated such that `edges` represents a valid tree.
- `1 <= queries.length == q <= 10^5`
- `queries[i].length == 2` or `4`
    - `queries[i] == [1, u, v, w']` or `queries[i] == [2, x]`
    - `1 <= u, v, x <= n`
    - `(u, v)` is always an edge from `edges`.
    - `1 <= w' <= 10^4`

## Hints

### Hint 1

Use an Euler tour to flatten the tree into an array so each node's subtree corresponds to a contiguous segment.

### Hint 2

For an update query [1, u, v, w'], adjust the distance for all descendants of the deeper endpoint by applying a delta to that contiguous range.

### Hint 3

A Fenwick (binary indexed) tree supports the range additions and point queries efficiently.

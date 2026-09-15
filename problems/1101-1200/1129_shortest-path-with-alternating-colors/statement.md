# Shortest Path with Alternating Colors

## Description

You are given an integer `n`, the number of nodes in a directed graph where the
nodes are labeled from `0` to `n - 1`. Each edge is **red** or **blue** in this
graph, and there could be self-edges and parallel edges.

You are given two arrays `redEdges` and `blueEdges` where:

- `redEdges[i] = [a_i, b_i]` indicates that there is a directed red edge from
  node `a_i` to node `b_i` in the graph, and
- `blueEdges[j] = [u_j, v_j]` indicates that there is a directed blue edge from
  node `u_j` to node `v_j` in the graph.

Return an array `answer` of length `n`, where `answer[x]` is the length of the
shortest path from node `0` to node `x` such that the edge colors **alternate**
along the path, or `-1` if such a path does not exist.

### Example 1

```text
Input: n = 3, redEdges = [[0,1],[1,2]], blueEdges = []
Output: [0,1,-1]
```

### Example 2

```text
Input: n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]
Output: [0,1,-1]
```

### Constraints

- `1 <= n <= 100`
- `0 <= redEdges.length, blueEdges.length <= 400`
- `redEdges[i].length == blueEdges[j].length == 2`
- `0 <= a_i, b_i, u_j, v_j < n`

## Hints

### Hint 1

Run a breadth-first search where the states are (node, color of the last edge taken).

### Hint 2

From each state, only traverse edges of the opposite color next.

### Hint 3

Each node's answer is the minimum over the two color states; unreachable nodes stay -1.

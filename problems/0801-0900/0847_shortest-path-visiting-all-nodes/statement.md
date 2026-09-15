# Shortest Path Visiting All Nodes

## Description

Given an undirected, connected graph of `n` nodes labeled from `0` to `n - 1`, you are given an array `graph` where `graph[i]` is a list of all the nodes connected with node `i` by an edge.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.

### Example 1

```text
Input: graph = [[1,2,3],[0],[0],[0]]
Output: 4
Explanation: One possible path is [1,0,2,0,3]
```

![The star graph with node 0 in the center and the route 1 - 0 - 2 - 0 - 3 traced in blue with numbered steps.](figures/example-1.svg)

### Example 2

```text
Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
Output: 4
Explanation: One possible path is [0,1,4,2,3]
```

![The five-node graph with the route 0 - 1 - 4 - 2 - 3 traced in blue and the unused edge 1 - 2 dashed.](figures/example-2.svg)

### Constraints

- `n == graph.length`
- `1 <= n <= 12`
- `0 <= graph[i].length < n`
- `graph[i]` does not contain `i`.
- If `graph[a]` contains `b`, then `graph[b]` contains `a`.
- The input graph is always connected.

## Hints

### Hint 1

Model the set of visited nodes as a bitmask and search over states of (current node, mask).

### Hint 2

Because you may start at any node, seed a breadth-first search from every node simultaneously.

### Hint 3

The first state whose mask contains every node gives the minimum number of steps.

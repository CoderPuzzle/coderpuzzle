# Largest Color Value in a Directed Graph

## Description

There is a directed graph of `n` colored nodes and `m` edges. The nodes are
numbered from `0` to `n - 1`.

You are given a string `colors` where `colors[i]` is a lowercase English
letter representing the color of the `ith` node in this graph (0-indexed).
You are also given a 2D array `edges` where `edges[j] = [aj, bj]` indicates
that there is a directed edge from node `aj` to node `bj`.

A valid path in the graph is a sequence of nodes
`x1 -> x2 -> x3 -> ... -> xk` such that there is a directed edge from `xi` to
`xi+1` for every `1 <= i < k`. The color value of the path is the number of
nodes that are colored the most frequently occurring color along that path.

Return the largest color value of any valid path in the given graph, or `-1`
if the graph contains a cycle.

### Example 1

```text
Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
Output: 3
Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a".
```

![Example 1 graph](figures/example-1.svg)

### Example 2

```text
Input: colors = "a", edges = [[0,0]]
Output: -1
Explanation: There is a cycle from 0 to 0.
```

![Example 2 graph](figures/example-2.svg)

### Constraints

- `n == colors.length`
- `m == edges.length`
- `1 <= n <= 10⁵`
- `0 <= m <= 10⁵`
- `colors` consists of lowercase English letters.
- `0 <= aj, bj < n`

## Hints

### Hint 1

Use a topological sort to process the nodes in a safe order when the graph contains no cycle.

### Hint 2

Let dp[u][c] be the maximum count of color c on any path ending at node u, and propagate these counts along the directed edges.

### Hint 3

If the topological sort does not visit every node, the graph contains a cycle, so return -1.

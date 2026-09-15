# Maximum Profit from Valid Topological Order in DAG

## Description

You are given a Directed Acyclic Graph (DAG) with `n` nodes labeled from `0` to `n - 1`, represented by a 2D array `edges`, where `edges[i] = [ui, vi]` indicates a directed edge from node `ui` to node `vi`. Each node has an associated score given in an array `score`, where `score[i]` represents the score of node `i`.

You must process the nodes in a valid topological order. Each node is assigned a 1-based position in the processing order.

The profit is calculated by summing up the product of each node's score and its position in the ordering.

Return the maximum possible profit achievable with an optimal topological order.

A topological order of a DAG is a linear ordering of its nodes such that for every directed edge `u → v`, node `u` comes before `v` in the ordering.

### Example 1

```text
Input: n = 2, edges = [[0,1]], score = [2,3]
Output: 8
Explanation: The only valid order is [0, 1]. Node 0 is at position 1 and
node 1 at position 2, so the profit is 2*1 + 3*2 = 8.
```

![Node 0 points to node 1; the only order puts them at positions 1 and 2 for a profit of 8.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, edges = [[0,1],[0,2]], score = [1,6,3]
Output: 25
Explanation: The optimal valid order is [0, 2, 1], giving 1*1 + 3*2 + 6*3 = 25.
```

![Node 0 points to nodes 1 and 2; the optimal order 0, 2, 1 places score 6 last for a profit of 25.](figures/example-2.svg)

### Constraints

- `1 <= n == score.length <= 22`
- `1 <= score[i] <= 10⁵`
- `0 <= edges.length <= n * (n - 1) / 2`
- `edges[i] == [ui, vi]` denotes a directed edge from `ui` to `vi`
- `0 <= ui, vi < n`
- `ui != vi`
- The input graph is guaranteed to be a DAG.
- There are no duplicate edges.

## Hints

### Hint 1

Use bitmask dynamic programming.

### Hint 2

States are mask = (bits such that if a bit is set, it means the corresponding node is removed).

### Hint 3

Try maintaining the degrees across function calls.

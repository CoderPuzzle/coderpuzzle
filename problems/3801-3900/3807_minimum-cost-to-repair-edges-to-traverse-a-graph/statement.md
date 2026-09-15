# Minimum Cost to Repair Edges to Traverse a Graph

## Description

You are given an undirected graph with `n` nodes labeled from `0` to
`n - 1`. The graph consists of `m` edges represented by a 2D integer array
`edges`, where `edges[i] = [ui, vi, wi]` indicates that there is an edge between
nodes `ui` and `vi` with a repair cost of `wi`.

You are also given an integer `k`. Initially, all edges are damaged.

You may choose a non-negative integer `money` and repair all edges whose repair
cost is less than or equal to `money`. All other edges remain damaged and cannot
be used.

You want to travel from node `0` to node `n - 1` using at most `k` edges.

Return an integer denoting the minimum amount of `money` required to make this
possible, or return `-1` if it is impossible.

### Example 1

```text
Input: n = 3, edges = [[0,1,10],[1,2,10],[0,2,100]], k = 1
Output: 100
Explanation:
The only valid path using at most k = 1 edge is 0 -> 2, which requires repairing
the edge with cost 100. Therefore, the minimum required amount of money is 100.
```

![A triangle of three nodes; with k = 1 the only route from 0 to 2 is the direct edge of cost 100, so the answer is 100.](figures/example-1.svg)

### Example 2

```text
Input: n = 6, edges = [[0,2,5],[2,3,6],[3,4,7],[4,5,5],[0,1,10],[1,5,12],[0,3,9],[1,2,8],[2,4,11]], k = 2
Output: 12
Explanation:
With money = 12, all edges with repair cost at most 12 become usable.
This allows the path 0 -> 1 -> 5, which uses exactly 2 edges and reaches node 5.
If money < 12, there is no available path of length at most k = 2 from node 0 to
node 5. Therefore, the minimum required money is 12.
```

![A weighted six-node graph; the cheapest path of at most 2 edges from 0 to 5 is 0 - 1 - 5, whose most expensive edge costs 12.](figures/example-2.svg)

### Example 3

```text
Input: n = 3, edges = [[0,1,1]], k = 1
Output: -1
Explanation:
It is impossible to reach node 2 from node 0 using any amount of money.
Therefore, the answer is -1.
```

![Three nodes where only 0 - 1 has an edge; node 2 has no incident edge, so it can never be reached and the answer is -1.](figures/example-3.svg)

### Constraints

- `2 <= n <= 5 * 10^4`
- `1 <= edges.length == m <= 10^5`
- `edges[i] = [ui, vi, wi]`
- `0 <= ui, vi < n`
- `1 <= wi <= 10^9`
- `1 <= k <= n`
- There are no self-loops or duplicate edges in the graph.

## Hints

### Hint 1

Use binary search on the amount of money.

### Hint 2

For a fixed value of money, check whether there exists a path from node 0 to node n - 1 that uses at most k edges.

### Hint 3

Use binary search to find the smallest value of money that makes this possible.

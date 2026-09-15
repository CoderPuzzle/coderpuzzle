# Find Edges in Shortest Paths

## Description

You are given an undirected weighted graph of `n` nodes numbered from `0` to
`n - 1`. The graph consists of `m` edges represented by a 2D array `edges`,
where `edges[i] = [ai, bi, wi]` indicates that there is an edge between nodes
`ai` and `bi` with weight `wi`.

Consider all the shortest paths from node `0` to node `n - 1` in the graph.
You need to find a boolean array `answer` where `answer[i]` is `true` if the
edge `edges[i]` is part of at least one shortest path. Otherwise, `answer[i]`
is `false`.

Return the array `answer`.

Note that the graph may not be connected.

### Example 1

```text
Input: n = 6, edges = [[0,1,4],[0,2,1],[1,3,2],[1,4,3],[1,5,1],[2,3,1],[3,5,3],[4,5,2]]
Output: [true,true,true,false,true,true,true,false]
Explanation: The following are all the shortest paths between nodes 0 and 5:
- The path 0 -> 1 -> 5: the sum of weights is 4 + 1 = 5.
- The path 0 -> 2 -> 3 -> 5: the sum of weights is 1 + 1 + 3 = 5.
- The path 0 -> 2 -> 3 -> 1 -> 5: the sum of weights is 1 + 1 + 2 + 1 = 5.
```

![Six edges lie on one of the three shortest 0-to-5 paths of total weight 5; edges 1-4 and 4-5 do not.](figures/example-1.svg)

### Example 2

```text
Input: n = 4, edges = [[2,0,1],[0,1,1],[0,3,4],[3,2,2]]
Output: [true,false,false,true]
Explanation: There is one shortest path between nodes 0 and 3, which is the
path 0 -> 2 -> 3 with the sum of weights 1 + 2 = 3.
```

![The single shortest path 0-2-3 of total weight 3; only its two edges are true.](figures/example-2.svg)

### Constraints

- `2 <= n <= 5 * 10⁴`
- `m == edges.length`
- `1 <= m <= min(5 * 10⁴, n * (n - 1) / 2)`
- `0 <= ai, bi < n`
- `ai != bi`
- `1 <= wi <= 10⁵`
- There are no repeated edges.

## Hints

### Hint 1

Find all the shortest paths starting from nodes 0 and n - 1 to all other nodes.

### Hint 2

Use the above calculated shortest paths to check if an edge is part of at least one shortest path from 0 to n - 1.

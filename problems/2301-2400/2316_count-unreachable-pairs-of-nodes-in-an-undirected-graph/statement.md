# Count Unreachable Pairs of Nodes in an Undirected Graph

## Description

You are given an integer `n`. There is an undirected graph with `n` nodes,
numbered from `0` to `n - 1`. You are given a 2D integer array `edges` where
`edges[i] = [a_i, b_i]` denotes that there exists an undirected edge
connecting nodes `a_i` and `b_i`.

Return the number of pairs of different nodes `(x, y)` such that `x` and `y`
are unreachable from each other.

### Example 1

```text
Input: n = 3, edges = [[0,1],[0,2],[1,2]]
Output: 0
Explanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.
```

![A triangle: all three nodes reach each other, so there are no unreachable pairs.](figures/example-1.svg)

### Example 2

```text
Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: There are 14 pairs of nodes that are unreachable from each other:
[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].
Therefore, we return 14.
```

![Three components of sizes 4, 2 and 1, giving 21 - 6 - 1 = 14 unreachable pairs.](figures/example-2.svg)

### Constraints

- `1 <= n <= 10^5`
- `0 <= edges.length <= 2 * 10^5`
- `edges[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- There are no repeated edges.

## Hints

### Hint 1

Find the connected components of the graph using Union-Find, BFS, or DFS.

### Hint 2

For a node u, the number of nodes unreachable from u is the number of nodes outside u's component; every node in the same component has the same count.

### Hint 3

The answer is C(n, 2) minus the sum of C(size, 2) over all components — use 64-bit arithmetic.

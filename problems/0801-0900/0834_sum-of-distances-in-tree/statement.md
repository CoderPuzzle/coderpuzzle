# Sum of Distances in Tree

## Description

There is an undirected connected tree with `n` nodes labeled from `0` to `n - 1`
and `n - 1` edges.

You are given the integer `n` and the array `edges`, where
`edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and
`bi` in the tree.

Return an array `answer` of length `n`, where `answer[i]` is the sum of the
distances between the `i`th node in the tree and all other nodes.

### Example 1

```text
Input: n = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: The tree is shown above.
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.
Hence, answer[0] = 8, and so on.
```

![The tree; the distances from node 0 sum to 1 + 1 + 2 + 2 + 2 = 8.](figures/example-1.svg)

### Example 2

```text
Input: n = 1, edges = []
Output: [0]
```

![A single node with no edges.](figures/example-2.svg)

### Example 3

```text
Input: n = 2, edges = [[1,0]]
Output: [1,1]
```

![Two nodes joined by one edge; each is distance 1 from the other.](figures/example-3.svg)

### Constraints

- `1 <= n <= 3 * 10⁴`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- The given input represents a valid tree.

## Hints

### Hint 1

Root the tree arbitrarily and, in a first DFS, compute for every node the size of its subtree and the sum of distances from that node to all nodes in its subtree.

### Hint 2

When the root is moved from a node `u` to its child `v`, every node in `v`'s subtree becomes one step closer and every other node becomes one step farther.

### Hint 3

Use the reroot recurrence `answer[v] = answer[u] + (n - size[v]) - size[v]` in a second DFS to fill in all answers.

# Find Diameter Endpoints of a Tree

## Description

You are given an undirected tree with `n` nodes, numbered from `0` to
`n - 1`. It is represented by a 2D integer array `edges` of length `n - 1`,
where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai`
and `bi` in the tree.

A node is called special if it is an endpoint of any diameter path of the
tree.

Return a binary string `s` of length `n`, where `s[i] = '1'` if node `i` is
special, and `s[i] = '0'` otherwise.

A diameter path of a tree is the longest simple path between any two nodes. A
tree may have multiple diameter paths.

An endpoint of a path is the first or last node on that path.

### Example 1

```text
Input: n = 3, edges = [[0,1],[1,2]]
Output: "101"
Explanation:
The diameter of this tree consists of 2 edges.
The only diameter path is the path from node 0 to node 2.
The endpoints of this path are nodes 0 and 2, so they are special.
```

![A three-node chain; the thick diameter from 0 to 2 spans 2 edges, and the shaded endpoints 0 and 2 are the special nodes.](figures/example-1.svg)

### Example 2

```text
Input: n = 7, edges = [[0,1],[1,2],[2,3],[3,4],[3,5],[1,6]]
Output: "1000111"
Explanation:
The diameter of this tree consists of 4 edges. There are 4 diameter paths:
The path from node 0 to node 4
The path from node 0 to node 5
The path from node 6 to node 4
The path from node 6 to node 5

The special nodes are nodes 0, 4, 5, 6, as they are endpoints in at least one
diameter path.
```

![A seven-node tree with one diameter 0 - 1 - 2 - 3 - 4 drawn thick; the shaded nodes 0, 4, 5, and 6 are the endpoints of the four diameter paths.](figures/example-2.svg)

### Example 3

```text
Input: n = 2, edges = [[0,1]]
Output: "11"
Explanation:
The diameter of this tree consists of 1 edge.
The only diameter path is the path from node 0 to node 1.
The endpoints of this path are nodes 0 and 1, so they are special.
```

![Two nodes joined by the single edge, which is the whole diameter; both shaded endpoints 0 and 1 are special.](figures/example-3.svg)

### Constraints

- `2 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [ai, bi]`
- `0 <= ai, bi < n`
- The input is generated such that `edges` represents a valid tree.

## Hints

### Hint 1

Start a breadth first search (BFS) from any node; let the farthest nodes found be one end of a diameter.

### Hint 2

Run BFS from one of those farthest nodes; the farthest nodes from it are the opposite ends of the diameters.

### Hint 3

If several nodes tie as farthest from the start, collect them all — each is a possible diameter endpoint.

### Hint 4

The special nodes are the union of both endpoint sets found this way.

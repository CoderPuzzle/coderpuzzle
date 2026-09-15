# Redundant Connection

## Description

In this problem, a tree is an undirected graph that is connected and has no
cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to
`n`, with one additional edge added. The added edge has two different vertices
chosen from `1` to `n`, and was not an edge that already existed. The graph is
represented as an array `edges` of length `n` where `edges[i] = [ai, bi]`
indicates that there is an edge between nodes `ai` and `bi` in the graph.

Return an edge that can be removed so that the resulting graph is a tree of `n`
nodes. If there are multiple answers, return the answer that occurs last in the
input.

### Example 1

```text
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
```

![Edges [1,2] and [1,3] already connect 2 and 3, so the last edge [2,3] closes the cycle.](figures/example-1.svg)

### Example 2

```text
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

![Edges [1,2], [2,3], [3,4] form a path from 1 to 4, so [1,4] closes the cycle.](figures/example-2.svg)

### Constraints

- `n == edges.length`
- `3 <= n <= 1000`
- `edges[i].length == 2`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- There are no repeated edges.
- The given graph is connected.

## Hints

### Hint 1

Process the edges in order and detect the first one whose endpoints are already connected.

### Hint 2

A union-find structure answers 'are these two nodes already connected?' in near-constant time per edge.

### Hint 3

When an edge joins two nodes that already share a root, that edge closes a cycle and is the one to remove.

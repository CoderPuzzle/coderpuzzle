# Minimum Time to Collect All Apples in a Tree

## Description

Given an undirected tree consisting of `n` vertices numbered from `0` to `n-1`, which has some apples in their vertices. You spend 1 second to walk over one edge of the tree. Return the minimum time in seconds you have to spend to collect all apples in the tree, starting at vertex `0` and coming back to this vertex.

The edges of the undirected tree are given in the array `edges`, where `edges[i] = [ai, bi]` means that there exists an edge connecting the vertices `ai` and `bi`. Additionally, there is a boolean array `hasApple`, where `hasApple[i] = true` means that vertex `i` has an apple; otherwise, it does not have any apple.

### Example 1

```text
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8
```

![The tree with apples at 2, 4 and 5; the four green edges are each walked down and back for 8 seconds.](figures/example-1.svg)

### Example 2

```text
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,false,true,false]
Output: 6
```

![The same tree with apples at 2 and 5; only three edges are needed, giving 6 seconds.](figures/example-2.svg)

### Example 3

```text
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,false,false,false,false,false]
Output: 0
```

### Constraints

- `1 <= n <= 10⁵`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= ai < bi <= n - 1`
- `hasApple.length == n`

## Hints

### Hint 1

If a node u contains an apple then all edges in the path from the root to the node u have to be used forward and backward (2 times).

### Hint 2

Use a depth-first search (DFS) to check if an edge will be used or not.

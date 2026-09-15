# Minimum Operations to Remove Adjacent Ones in Matrix

## Description

You are given a 0-indexed binary matrix grid. In one operation, you can flip any 1 in grid to be 0.

A binary matrix is well-isolated if there is no 1 in the matrix that is 4-directionally connected (i.e., horizontal and vertical) to another 1.

Return the minimum number of operations to make grid well-isolated.

### Example 1

![diagram](figures/2123-1.svg)

```text
Input: grid = [[1,1,0],[0,1,1],[1,1,1]]
Output: 3
Explanation: Use 3 operations to change grid[0][1], grid[1][2], and grid[2][1] to 0.
After, no more 1's are 4-directionally connected and grid is well-isolated.
```

### Example 2

![diagram](figures/2123-2.svg)

```text
Input: grid = [[0,0,0],[0,0,0],[0,0,0]]
Output: 0
Explanation: There are no 1's in grid and it is well-isolated.
No operations were done so return 0.
```

### Example 3

![diagram](figures/2123-3.svg)

```text
Input: grid = [[0,1],[1,0]]
Output: 0
Explanation: None of the 1's are 4-directionally connected and grid is well-isolated.
No operations were done so return 0.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is either `0` or `1`.

## Hints

### Hint 1

Consider each cell containing a 1 as a vertex whose neighbors are the cells 4-directionally connected to it. The grid then becomes a bipartite graph.

### Hint 2

You want to find the smallest set of vertices such that every edge in the graph has an endpoint in this set. If you remove every vertex in this set from the graph, then all the 1’s will be disconnected. Are there any well-known algorithms for finding this set?

### Hint 3

This set of vertices is called a minimum vertex cover. You can find the size of a minimum vertex cover by finding the size of a maximum matching (Konig’s theorem).

### Hint 4

There are well-known algorithms such as Kuhn’s algorithm and Hopcroft-Karp-Karzanov algorithm which can find a maximum matching in a bipartite graph quickly.

# Number of Operations to Make Network Connected

## Description

There are `n` computers numbered from `0` to `n - 1` connected by ethernet
cables `connections` forming a network where `connections[i] = [ai, bi]`
represents a connection between computers `ai` and `bi`. Any computer can
reach any other computer directly or indirectly through the network.

You are given an initial computer network `connections`. You can extract
certain cables between two directly connected computers, and place them
between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all
the computers connected. If it is not possible, return `-1`.

### Example 1

```text
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
```

![Before and after: the redundant cable 1-2 is dashed out and relaid as the blue cable 1-3, connecting the isolated computer 3.](figures/example-1.svg)

### Example 2

```text
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
```

![Before and after: two redundant cables among computers 0-3 are dashed out and relaid in blue to connect the isolated computers 4 and 5.](figures/example-2.svg)

### Example 3

```text
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
```

### Constraints

- `1 <= n <= 10^5`
- `1 <= connections.length <= min(n * (n - 1) / 2, 10^5)`
- `connections[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- There are no repeated connections.
- No two computers are connected by more than one cable.

## Hints

### Hint 1

As long as there are at least n - 1 connections, there is definitely a way to connect all computers.

### Hint 2

Use DFS, BFS, or union-find to determine the number of isolated computer clusters (connected components).

### Hint 3

The answer is the number of components minus one, or -1 when there are fewer than n - 1 cables.

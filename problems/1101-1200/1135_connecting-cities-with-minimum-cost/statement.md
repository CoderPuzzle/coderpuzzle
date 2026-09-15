# Connecting Cities With Minimum Cost

## Description

There are `n` cities labeled from `1` to `n`. You are given the integer `n`
and an array `connections` where `connections[i] = [xi, yi, costi]` indicates
that the cost of connecting city `xi` and city `yi` (bidirectional connection)
is `costi`.

Return the minimum cost to connect all the `n` cities such that there is at
least one path between each pair of cities. If it is impossible to connect all
the `n` cities, return `-1`.

The cost is the sum of the connections' costs used.

### Example 1

```text
Input: n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
Explanation: Choosing any 2 edges will connect all cities so we choose the minimum 2.
```

![A triangle of cities with the cost-1 and cost-5 links chosen in blue and the cost-6 link dashed and unused.](figures/example-1.svg)

### Example 2

```text
Input: n = 4, connections = [[1,2,3],[3,4,4]]
Output: -1
Explanation: There is no way to connect all cities even if all edges are used.
```

![Four cities in two disconnected pairs, 1-2 and 3-4, with no cable between the islands.](figures/example-2.svg)

### Constraints

- `1 <= n <= 10^4`
- `1 <= connections.length <= 10^4`
- `connections[i].length == 3`
- `1 <= xi, yi <= n`
- `xi != yi`
- `0 <= costi <= 10^5`

## Hints

### Hint 1

Model the cities and connections as a weighted undirected graph; what you need is a minimum spanning tree.

### Hint 2

Sort the edges by their cost and use Kruskal's algorithm with a union-find data structure.

### Hint 3

Start with n connected components; every edge that joins two different components reduces the count by one.

### Hint 4

If you do not end with a single connected component after processing all edges, it is impossible to connect the cities — return -1.

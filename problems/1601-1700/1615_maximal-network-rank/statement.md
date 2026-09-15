# Maximal Network Rank

## Description

There is an infrastructure of `n` cities, numbered from `0` to `n - 1`,
with some number of roads connecting them. Each `roads[i] = [ai, bi]`
indicates a bidirectional road between cities `ai` and `bi`.

The network rank of two **different** cities is the total number of
roads directly connected to either city. If a road connects both
cities directly, it is counted only once.

The maximal network rank of the infrastructure is the maximum network
rank over all pairs of different cities.

Given `n` and `roads`, return the maximal network rank of the entire
infrastructure.

### Example 1

![diagram](figures/1615-1.svg)

```text
Input: n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
Output: 4
Explanation: The network rank of cities 0 and 1 is 4, since 4 roads are
connected to either 0 or 1. The road between 0 and 1 is counted once.
```

### Example 2

![diagram](figures/1615-2.svg)

```text
Input: n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
Output: 5
Explanation: There are 5 roads connected to cities 1 or 2.
```

### Example 3

```text
Input: n = 8, roads = [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]
Output: 5
Explanation: The network rank of 2 and 5 is 5. Cities do not have to be
connected to every other city.
```

### Constraints

- `2 <= n <= 100`
- `0 <= roads.length <= n * (n - 1) / 2`
- `roads[i].length == 2`
- `0 <= ai, bi <= n - 1`
- `ai != bi`
- Each pair of cities has at most one road connecting them.

## Hints

### Hint 1

Try every pair of different cities and calculate its network rank.

### Hint 2

The network rank of two vertices is almost the sum of their degrees.

### Hint 3

How can you efficiently check if there is a road connecting two
different cities?

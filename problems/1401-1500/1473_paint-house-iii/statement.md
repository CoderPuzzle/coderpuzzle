# Paint House III

## Description

There is a row of `m` houses in a small city, each house must be painted
with one of the `n` colors (labeled from `1` to `n`); some houses that
have been painted last summer should not be painted again.

A neighborhood is a maximal group of continuous houses that are painted
with the same color.

- For example: `houses = [1,2,2,3,3,2,1,1]` contains 5 neighborhoods:
  `[{1}, {2,2}, {3,3}, {2}, {1,1}]`.

Given an array `houses`, an `m x n` matrix `cost` and an integer `target`
where:

- `houses[i]`: the color of house `i`, or `0` if it is not painted yet.
- `cost[i][j]`: the cost to paint house `i` with color `j + 1`.

Return the minimum cost of painting all the remaining houses in such a way
that there are exactly `target` neighborhoods. If it is not possible,
return `-1`.

### Example 1

```text
Input: houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
Output: 9
Explanation: Paint the houses as [1,2,2,1,1]. This array contains exactly
target = 3 neighborhoods: [{1}, {2,2}, {1,1}]. The total paint cost is
(1 + 1 + 1 + 1 + 5) = 9.
```

### Example 2

```text
Input: houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
Output: 11
Explanation: Some houses are already painted. Paint the rest as [2,2,1,2,2],
giving 3 neighborhoods: [{2,2}, {1}, {2,2}]. Only the first and last houses
need paint, costing (10 + 1) = 11.
```

### Example 3

```text
Input: houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3
Output: -1
Explanation: The painted houses already form 4 neighborhoods
[{3},{1},{2},{3}], which differs from target = 3.
```

### Constraints

- `m == houses.length == cost.length`
- `n == cost[i].length`
- `1 <= m <= 100`
- `1 <= n <= 20`
- `1 <= target <= m`
- `0 <= houses[i] <= n`
- `1 <= cost[i][j] <= 10⁴`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Define `dp[i][j][k]` as the minimum cost where we have `k` neighborhoods
in the first `i` houses and the `i`-th house is painted with color `j`.

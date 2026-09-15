# Maximal Square

## Description

Given an `m x n` binary matrix filled with `0`'s and `1`'s, find the largest
square containing only `1`'s and return its area.

### Example 1

```text
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4
```

![The binary matrix with a maximal 2 by 2 square highlighted.](figures/example-1.svg)

### Example 2

```text
Input: matrix = [["0","1"],["1","0"]]
Output: 1
```

![A 2 by 2 board whose two 1s meet only at a corner.](figures/example-2.svg)

### Example 3

```text
Input: matrix = [["0"]]
Output: 0
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` is `'0'` or `'1'`.

## Hints

### Hint 1

Let dp[i][j] be the side length of the largest all-ones square whose bottom-right corner is at cell (i, j).

### Hint 2

When matrix[i][j] is '1', dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1; otherwise it is 0.

### Hint 3

The answer is the square of the maximum dp value; a rolling one-dimensional array is enough.

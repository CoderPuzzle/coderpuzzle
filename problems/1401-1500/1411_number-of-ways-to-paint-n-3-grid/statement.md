# Number of Ways to Paint N × 3 Grid

## Description

You have a grid of size `n x 3` and you want to paint each cell of the
grid with exactly one of the three colors: Red, Yellow, or Green while
making sure that no two adjacent cells have the same color (i.e., no two
cells that share vertical or horizontal sides have the same color).

Given `n` the number of rows of the grid, return the number of ways you
can paint this grid. As the answer may grow large, the answer must be
computed modulo `10⁹ + 7`.

### Example 1

![diagram](figures/1411-1.svg)

```text
Input: n = 1
Output: 12
Explanation: There are 12 possible ways to paint the grid as shown in the
problem's figure.
```

### Example 2

```text
Input: n = 5000
Output: 30228214
```

### Constraints

- `n == grid.length`
- `1 <= n <= 5000`

## Hints

### Hint 1

We will use Dynamic programming approach. we will try all possible
configuration.

### Hint 2

Let `dp[idx][prev1col][prev2col][prev3col]` be the number of ways to
color the rows of the grid from `idx` to `n-1` keeping in mind that the
previous row (`idx - 1`) has colors `prev1col`, `prev2col` and
`prev3col`. Build the dp array to get the answer.

# Maximum Non Negative Product in a Matrix

## Description

You are given an `m x n` matrix `grid`. Starting at the top-left corner
`(0, 0)`, you may move only right or down at each step, ending at the
bottom-right corner `(m - 1, n - 1)`.

Among every path from the top-left corner to the bottom-right corner,
find the one whose product — the product of all the integers on the cells
it visits — is the largest non-negative product. Return that product
modulo `10^9 + 7`. If every path's product is negative, return `-1`
instead.

The modulo is applied only after the maximum product itself has been
determined.

### Example 1

![diagram](figures/1594-1.svg)

```text
Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
Output: -1
Explanation: No path from (0, 0) to (2, 2) has a non-negative product,
so the answer is -1.
```

### Example 2

![diagram](figures/1594-2.svg)

```text
Input: grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
Output: 8
Explanation: The path 1 * 1 * -2 * -4 * 1 = 8 has the maximum
non-negative product.
```

### Example 3

![diagram](figures/1594-3.svg)

```text
Input: grid = [[1,3],[0,-4]]
Output: 0
Explanation: The path 1 * 0 * -4 = 0 has the maximum non-negative
product.
```

### Constraints

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 15`
- `-4 <= grid[i][j] <= 4`

## Hints

### Hint 1

Use dynamic programming. Keep both the highest value and the lowest value
reachable at each cell.

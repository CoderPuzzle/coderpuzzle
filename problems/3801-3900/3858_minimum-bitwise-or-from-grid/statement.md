# Minimum Bitwise OR From Grid

## Description

You are given a 2D integer array grid of size m x n.

You must select exactly one integer from each row of the grid.

Return an integer denoting the minimum possible bitwise OR of the selected integers from each row.

### Example 1

```text
Input: grid = [[1,5],[2,4]]
Output: 3
Explanation:
Choose 1 from the first row and 2 from the second row.
The bitwise OR of 1 | 2 = 3, which is the minimum possible.
```

### Example 2

```text
Input: grid = [[3,5],[6,4]]
Output: 5
Explanation:
Choose 5 from the first row and 4 from the second row.
The bitwise OR of 5 | 4 = 5, which is the minimum possible.
```

### Example 3

```text
Input: grid = [[7,9,8]]
Output: 7
Explanation:
Choosing 7 gives the minimum bitwise OR.
```

### Constraints

- `1 <= m == grid.length <= 10⁵`
- `1 <= n == grid[i].length <= 10⁵`
- `m * n <= 10⁵`
- `1 <= grid[i][j] <= 10⁵`

## Hints

### Hint 1

Solve greedily, bit by bit from the most significant to the least significant

### Hint 2

For a bit, check whether it is possible to exclude it from the OR by choosing, in every row, at least one number with that bit unset

### Hint 3

Accumulate all bits that cannot be excluded; the final value is the minimum possible bitwise OR

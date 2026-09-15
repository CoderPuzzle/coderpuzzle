# Largest 1-Bordered Square

## Description

Given a 2D `grid` of 0s and 1s, return the number of elements in the largest
square subgrid that has all 1s on its border, or `0` if such a subgrid
doesn't exist in the grid.

### Example 1

```text
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 9
```

### Example 2

```text
Input: grid = [[1,1,0,0]]
Output: 1
```

### Constraints

- `1 <= grid.length, grid[i].length <= 100`
- `grid[i][j]` is `0` or `1`

## Hints

### Hint 1

For each square, know how many ones are up, left, down, and right of this
square. You can find it in `O(N²)` using dynamic programming.

### Hint 2

Now for each square (`O(N³)`), we can evaluate whether that square is
1-bordered in `O(1)`.

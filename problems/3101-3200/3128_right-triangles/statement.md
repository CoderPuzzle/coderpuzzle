# Right Triangles

## Description

You are given a 2D boolean matrix grid.

A collection of 3 elements of grid is a right triangle if one of its
elements is in the same row with another element and in the same column
with the third element. The 3 elements may not be next to each other.

Return an integer that is the number of right triangles that can be made
with 3 elements of grid such that all of them have a value of 1.

### Example 1

```text
Input: grid = [[0,1,0],[0,1,1],[0,1,0]]
Output: 2
Explanation: There are two right triangles with elements of the value 1.
Notice that the blue ones do not form a right triangle because the 3
elements are in the same column.
```

### Example 2

```text
Input: grid = [[1,0,0,0],[0,1,0,1],[1,0,0,0]]
Output: 0
Explanation: There are no right triangles with elements of the value 1.
Notice that the blue ones do not form a right triangle.
```

### Example 3

```text
Input: grid = [[1,0,1],[1,0,0],[1,0,0]]
Output: 2
Explanation: There are two right triangles with elements of the value 1.
```

### Constraints

- `1 <= grid.length <= 1000`
- `1 <= grid[i].length <= 1000`
- `0 <= grid[i][j] <= 1`

## Hints

### Hint 1

If grid[x][y] is 1, it can form a right triangle with an element of grid
with value 1 in the same row and an element of grid with value 1 in the
same column.

### Hint 2

So we just need to count the number of 1s in each row and column.

### Hint 3

For each x, y with grid[x][y] = 1 if there are row[x] 1s in the row x and
col[y] 1s in column y, the answer should be added by
(row[x] - 1) * (col[y] - 1).

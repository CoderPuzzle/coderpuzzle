# Count Square Submatrices with All Ones

## Description

Given a `m * n` matrix of ones and zeros, return how many square submatrices
have all ones.

### Example 1

```text
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation:
There are 10 squares of side 1.
There are 4 squares of side 2.
There is 1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.
```

### Example 2

```text
Input: matrix =
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation:
There are 6 squares of side 1.
There is 1 square of side 2.
Total number of squares = 6 + 1 = 7.
```

### Constraints

- `1 <= arr.length <= 300`
- `1 <= arr[0].length <= 300`
- `0 <= arr[i][j] <= 1`

## Hints

### Hint 1

Create an additive table that counts the sum of elements of each submatrix with the upper-left corner at (0,0).

### Hint 2

Loop over all subsquares and check if the sum makes the whole square all ones; if it does, add 1 to the answer.

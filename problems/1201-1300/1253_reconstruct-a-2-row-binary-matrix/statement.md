# Reconstruct a 2-Row Binary Matrix

## Description

Given the following details of a matrix with `n` columns and `2` rows:

- The matrix is a binary matrix, which means each element in the matrix can be
  `0` or `1`.
- The sum of elements of the `0`-th (upper) row is given as `upper`.
- The sum of elements of the `1`-st (lower) row is given as `lower`.
- The sum of elements in the `i`-th column (0-indexed) is `colsum[i]`, where
  `colsum` is given as an integer array with length `n`.

Your task is to reconstruct the matrix with `upper`, `lower`, and `colsum`.

Return it as a 2-D integer array.

If there is more than one valid solution, any of them will be accepted.

If no valid solution exists, return an empty 2-D array.

### Example 1

```text
Input: upper = 2, lower = 1, colsum = [1,1,1]
Output: [[1,1,0],[0,0,1]]
Explanation: [[1,0,1],[0,1,0]], and [[0,1,1],[1,0,0]] are also correct answers.
```

### Example 2

```text
Input: upper = 2, lower = 3, colsum = [2,2,1,1]
Output: []
```

### Example 3

```text
Input: upper = 5, lower = 5, colsum = [2,1,2,0,1,0,1,2,0,1]
Output: [[1,1,1,0,1,0,0,1,0,0],[1,0,1,0,0,0,1,1,0,1]]
```

### Constraints

- `1 <= colsum.length <= 10^5`
- `0 <= upper, lower <= colsum.length`
- `0 <= colsum[i] <= 2`

## Hints

### Hint 1

You cannot do anything about the `colsum[i] = 2` or `colsum[i] = 0` cases.
Then you put each `colsum[i] = 1` column into the upper row until `upper`
is reached; after that you put the rest into the lower row.

### Hint 2

Fill the `0` and `2` columns first, then fill the `1` columns into the upper
row or the lower row in turn — but be careful about exhausting the permitted
ones in each row.

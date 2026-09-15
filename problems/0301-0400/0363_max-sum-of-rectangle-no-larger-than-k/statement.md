# Max Sum of Rectangle No Larger Than K

## Description

Given an `m x n` matrix `matrix` and an integer `k`, return the max sum of a rectangle in the matrix such that its sum is no larger than `k`.

It is guaranteed that there will be a rectangle with a sum no larger than `k`.

### Example 1

```text
Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
```

![The matrix with the shaded 2x2 rectangle [[0, 1], [-2, 3]] whose sum is 2](figures/example-1.svg)

### Example 2

```text
Input: matrix = [[2,2,-1]], k = 3
Output: 3
```

### Constraints

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-100 <= matrix[i][j] <= 100`
- `-10⁵ <= k <= 10⁵`

### Follow-up

What if the number of rows is much larger than the number of columns?

## Hints

### Hint 1

Fix a pair of rows and collapse the rectangle between them into a one-dimensional array of column sums.

### Hint 2

For that collapsed array, finding the max subarray sum no larger than k reduces to scanning prefix sums and querying the closest preceding prefix.

### Hint 3

Keep the prefix sums seen so far in a sorted container so each query can find the candidate that maximizes the subarray sum while staying at or below k.

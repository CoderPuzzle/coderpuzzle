# Kth Smallest Number in Multiplication Table

## Description

Nearly everyone has used the Multiplication Table. The multiplication table
of size `m x n` is an integer matrix `mat` where `mat[i][j] == i * j`
(1-indexed).

Given three integers `m`, `n`, and `k`, return the `k`-th smallest element in
the `m x n` multiplication table.

### Example 1

```text
Input: m = 3, n = 3, k = 5
Output: 3
Explanation: The 5th smallest number is 3.
```

![The 3 x 3 multiplication table with its values in sorted order; the 5th smallest is 3.](figures/example-1.svg)

### Example 2

```text
Input: m = 2, n = 3, k = 6
Output: 6
Explanation: The 6th smallest number is 6.
```

![The 2 x 3 multiplication table with its values in sorted order; the 6th smallest is 6.](figures/example-2.svg)

### Constraints

- `1 <= m, n <= 3 * 10^4`
- `1 <= k <= m * n`

## Hints

### Hint 1

Binary search on the answer value v in the range [1, m * n] instead of enumerating the table.

### Hint 2

For a given v, the number of table entries <= v is the sum over every row i of min(v // i, n), which takes only O(m) to compute.

### Hint 3

Find the smallest v whose count is >= k; that v is guaranteed to be an actual table entry and is the kth smallest element.

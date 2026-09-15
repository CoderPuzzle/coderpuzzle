# Number of ZigZag Arrays III

## Description

You are given three integers n, l, and r.

A ZigZag array of length n is defined as follows:

- Each element lies in the range [l, r].
- No two adjacent elements are equal.
- No three consecutive elements form a strictly increasing or strictly
  decreasing sequence.

Return the total number of valid ZigZag arrays.

Since the answer may be large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: n = 3, l = 4, r = 5
Output: 2
Explanation: There are only 2 valid ZigZag arrays of length n = 3 using values
in the range [4, 5]:

[4, 5, 4]
[5, 4, 5]
```

### Example 2

```text
Input: n = 3, l = 1, r = 3
Output: 10
Explanation: There are 10 valid ZigZag arrays of length n = 3 using values in
the range [1, 3]:

[1, 2, 1], [1, 3, 1], [1, 3, 2]
[2, 1, 2], [2, 1, 3], [2, 3, 1], [2, 3, 2]
[3, 1, 2], [3, 1, 3], [3, 2, 3]

All arrays meet the ZigZag conditions.
```

### Constraints

- `3 <= n <= 200`
- `1 <= l < r <= 10⁹`

## Hints

### Hint 1

Let m = r - l + 1. The actual values do not matter, only how many distinct
choices you have.

### Hint 2

The answer as a function of m is a polynomial of degree at most n. So instead
of working up to large m, compute values for small m.

### Hint 3

Use Dynamic Programming: dp[i][j][dir] = number of arrays of length i ending
at value j with last move direction dir (up/down). Use prefix sums to transition
in O(n^2) total for all m .

### Hint 4

After computing answers for m = 1, 2, ..., n+1, use Lagrange interpolation to
evaluate the polynomial at the actual m in O(n) or O(n^2) time.

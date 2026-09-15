# Integer Break

## Description

Given an integer `n`, break it into the sum of `k` positive integers, where
`k >= 2`, and maximize the product of those integers.

Return the maximum product you can get.

### Example 1

```text
Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.
```

### Example 2

```text
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.
```

### Constraints

- `2 <= n <= 58`

## Hints

### Hint 1

There is a simple O(n) solution to this problem.

### Hint 2

You may check the breaking results of n ranging from 7 to 10 to discover the
regularities.

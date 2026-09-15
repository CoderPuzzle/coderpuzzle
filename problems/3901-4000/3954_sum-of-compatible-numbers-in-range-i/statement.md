# Sum of Compatible Numbers in Range I

## Description

A positive integer `x` is compatible when `abs(n - x) <= k` and `(n & x) == 0`, where `&` is bitwise AND. Return the sum of all compatible integers.

### Example 1

```text
Input: n = 2, k = 3
Output: 10
```

### Example 2

```text
Input: n = 5, k = 1
Output: 0
```

### Constraints

- `1 <= n <= 100`
- `1 <= k <= 100`

## Hints

### Hint 1

Check every positive integer from `max(1, n-k)` through `n+k`.

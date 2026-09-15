# Check Good Integer

## Description

You are given a positive integer `n`.

Let `digitSum` be the sum of the digits of `n`, and let `squareSum` be the sum
of the squares of the digits of `n`.

An integer is called good if `squareSum - digitSum >= 50`.

Return `true` if `n` is good. Otherwise, return `false`.

### Example 1

```text
Input: n = 1000
Output: false
Explanation:
    The digits of 1000 are 1, 0, 0, and 0.
    The digitSum is 1 + 0 + 0 + 0 = 1.
    The squareSum is 1² + 0² + 0² + 0² = 1.
    The squareSum - digitSum is 1 - 1 = 0.
    As 0 is not greater than or equal to 50, the output is false.
```

### Example 2

```text
Input: n = 19
Output: true
Explanation:
    The digits of 19 are 1 and 9.
    The digitSum is 1 + 9 = 10.
    The squareSum is 1² + 9² = 1 + 81 = 82.
    The squareSum - digitSum is 82 - 10 = 72.
    As 72 is greater than or equal to 50, the output is true.
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

Pure simulation problem.

# Sum Multiples

## Description

Given a positive integer n, find the sum of all integers in the range
[1, n] inclusive that are divisible by 3, 5, or 7.

Return an integer denoting the sum of all numbers in the given range
satisfying the constraint.

### Example 1

```text
Input: n = 7
Output: 21
Explanation: Numbers in the range [1, 7] that are divisible by 3, 5, or 7 are 3, 5, 6, 7. The sum of these numbers is 21.
```

### Example 2

```text
Input: n = 10
Output: 40
Explanation: Numbers in the range [1, 10] that are divisible by 3, 5, or 7 are 3, 5, 6, 7, 9, 10. The sum of these numbers is 40.
```

### Example 3

```text
Input: n = 9
Output: 30
Explanation: Numbers in the range [1, 9] that are divisible by 3, 5, or 7 are 3, 5, 6, 7, 9. The sum of these numbers is 30.
```

### Constraints

- `1 <= n <= 10³`

## Hints

### Hint 1

Iterate through the range 1 to n and count numbers divisible by either 3, 5, or 7.

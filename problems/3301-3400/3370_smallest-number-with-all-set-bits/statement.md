# Smallest Number With All Set Bits

## Description

You are given a positive number n.

Return the smallest number x greater than or equal to n, such that the
binary representation of x contains only set bits

### Example 1

```text
Input: n = 5
Output: 7
Explanation: The binary representation of 7 is "111".
```

### Example 2

```text
Input: n = 10
Output: 15
Explanation: The binary representation of 15 is "1111".
```

### Example 3

```text
Input: n = 3
Output: 3
Explanation: The binary representation of 3 is "11".
```

### Constraints

- `1 <= n <= 1000`

## Hints

### Hint 1

Find the strictly greater power of 2, and subtract 1 from it.

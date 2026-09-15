# Smallest Integer Divisible by K

## Description

Given a positive integer k, you need to find the length of the smallest
positive integer n such that n is divisible by k, and n only contains
the digit 1.

Return the length of n. If there is no such n, return -1.

Note: n may not fit in a 64-bit signed integer.

### Example 1

```text
Input: k = 1
Output: 1
Explanation: The smallest answer is n = 1, which has length 1.
```

### Example 2

```text
Input: k = 2
Output: -1
Explanation: There is no such positive integer n divisible by 2.
```

### Example 3

```text
Input: k = 3
Output: 3
Explanation: The smallest answer is n = 111, which has length 3.
```

### Constraints

- `1 <= k <= 10⁵`

## Hints

### Hint 1

11111 = 1111 \* 10 + 1. We only need to store remainders modulo K.

### Hint 2

If we never get a remainder of 0, why would that happen, and how would
we know that?

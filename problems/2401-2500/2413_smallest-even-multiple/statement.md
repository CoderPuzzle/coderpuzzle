# Smallest Even Multiple

## Description

Given a positive integer n, return the smallest positive integer that is a
multiple of both 2 and n.

### Example 1

```text
Input: n = 5
Output: 10
Explanation: The smallest multiple of both 5 and 2 is 10.
```

### Example 2

```text
Input: n = 6
Output: 6
Explanation: The smallest multiple of both 6 and 2 is 6. Note that a number is a multiple of itself.
```

### Constraints

- `1 <= n <= 150`

## Hints

### Hint 1

A guaranteed way to find a multiple of 2 and n is to multiply them
together. When is this the answer, and when is there a smaller answer?

### Hint 2

There is a smaller answer when n is even.

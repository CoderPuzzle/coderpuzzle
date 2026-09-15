# Number of Common Factors

## Description

Given two positive integers a and b, return the number of common factors of
a and b.

An integer x is a common factor of a and b if x divides both a and b.

### Example 1

```text
Input: a = 12, b = 6
Output: 4
Explanation: The common factors of 12 and 6 are 1, 2, 3, 6.
```

### Example 2

```text
Input: a = 25, b = 30
Output: 2
Explanation: The common factors of 25 and 30 are 1, 5.
```

### Constraints

- `1 <= a, b <= 1000`

## Hints

### Hint 1

For each integer in range [1,1000], check if it’s divisible by both A and B.

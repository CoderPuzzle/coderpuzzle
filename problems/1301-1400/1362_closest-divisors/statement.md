# Closest Divisors

## Description

Given an integer num, find the closest two integers in absolute difference whose product equals num + 1 or num + 2.

Return the two integers in any order.

### Example 1

```text
Input: num = 8
Output: [3,3]
Explanation: For num + 1 = 9, the closest divisors are 3 & 3, for num + 2 = 10, the closest divisors are 2 & 5, hence 3 & 3 is chosen.
```

### Example 2

```text
Input: num = 123
Output: [5,25]
```

### Example 3

```text
Input: num = 999
Output: [40,25]
```

### Constraints

- `1 <= num <= 10^9`

## Hints

### Hint 1

Find the divisors of n+1 and n+2.

### Hint 2

To find the divisors of a number, you only need to iterate to the square root of that number.

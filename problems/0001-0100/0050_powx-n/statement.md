# Pow(x, n)

## Description

Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e.,
`x^n`).

### Example 1

```text
Input: x = 2.00000, n = 10
Output: 1024.00000
```

### Example 2

```text
Input: x = 2.10000, n = 3
Output: 9.26100
```

### Example 3

```text
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
```

### Constraints

- `-100.0 < x < 100.0`
- `-2^31 <= n <= 2^31 - 1`
- `n` is an integer.
- Either `x` is not zero or `n > 0`.
- `-10^4 <= x^n <= 10^4`

## Hints

### Hint 1

Exponentiation by squaring computes x^n in O(log n) multiplications: x^n = (x^2)^(n/2) when n is even, and x * (x^2)^((n-1)/2) when n is odd.

### Hint 2

Handle a negative exponent by computing the positive power and taking the reciprocal at the end.

### Hint 3

Beware of n = -2^31: negating it overflows a 32-bit signed integer, so work with the absolute value in a wider type.

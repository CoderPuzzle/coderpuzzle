# GCD of Odd and Even Sums

## Description

You are given a positive integer `n`. Let `sumOdd` be the sum of the
smallest `n` positive odd numbers, and let `sumEven` be the sum of the
smallest `n` positive even numbers.

Return the greatest common divisor (GCD) of `sumOdd` and `sumEven`.

### Example 1

```text
Input: n = 4
Output: 4
Explanation: sumOdd = 1 + 3 + 5 + 7 = 16 and
sumEven = 2 + 4 + 6 + 8 = 20, so gcd(16, 20) = 4.
```

### Example 2

```text
Input: n = 5
Output: 5
Explanation: sumOdd = 1 + 3 + 5 + 7 + 9 = 25 and
sumEven = 2 + 4 + 6 + 8 + 10 = 30, so gcd(25, 30) = 5.
```

### Constraints

- `1 <= n <= 1000`

## Hints

### Hint 1

The first `n` odd numbers sum to `n * n`.

### Hint 2

The first `n` even numbers sum to `n * (n + 1)`.

### Hint 3

`gcd(n, n + 1) = 1`, so the answer is `n`.

# Ways to Express an Integer as Sum of Powers

## Description

Given two positive integers `n` and `x`.

Return the number of ways `n` can be expressed as the sum of the xth power
of unique positive integers, in other words, the number of sets of unique
integers `[n1, n2, ..., nk]` where `n = n₁ˣ + n₂ˣ + ... + nₖˣ`.

Since the result can be very large, return it modulo `10⁹ + 7`.

For example, if `n = 160` and `x = 3`, one way to express `n` is
`n = 2³ + 3³ + 5³`.

### Example 1

```text
Input: n = 10, x = 2
Output: 1
Explanation: We can express n as the following: n = 3² + 1² = 10.
It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.
```

### Example 2

```text
Input: n = 4, x = 1
Output: 2
Explanation: We can express n in the following ways:
- n = 4¹ = 4.
- n = 3¹ + 1¹ = 4.
```

### Constraints

- `1 <= n <= 300`
- `1 <= x <= 5`

## Hints

### Hint 1

You can use dynamic programming, where `dp[k][j]` represents the number of
ways to express `k` as the sum of the x-th power of unique positive integers
such that the biggest possible number we use is `j`.

### Hint 2

To calculate `dp[k][j]`, you can iterate over the numbers smaller than `j`
and try to use each one as a power of `x` to make our sum `k`.

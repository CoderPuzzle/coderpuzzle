# Ugly Number III

## Description

An **ugly number** is a positive integer that is divisible by `a`, `b`, or `c`.

Given four integers `n`, `a`, `b`, and `c`, return the `n`-th ugly number.

### Example 1

```text
Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The ugly numbers are 2, 3, 4, 5, 6, 8, 9, 10 ... The 3rd is 4.
```

### Example 2

```text
Input: n = 4, a = 2, b = 3, c = 4
Output: 6
Explanation: The ugly numbers are 2, 3, 4, 6, 8, 9, 10, 12 ... The 4th is 6.
```

### Example 3

```text
Input: n = 5, a = 2, b = 11, c = 13
Output: 10
Explanation: The ugly numbers are 2, 4, 6, 8, 10, 11, 12, 13 ... The 5th is 10.
```

### Constraints

- `1 <= n, a, b, c <= 10⁹`
- `1 <= a * b * c <= 10¹⁸`
- The result is guaranteed to be in the range `[1, 2 * 10⁹]`.

### Follow-up

Can you find the `n`-th ugly number with a logarithmic number of evaluations of
a counting function, each computed in constant time?

## Hints

### Hint 1

Define `f(k)` as the number of ugly numbers less than or equal to `k`. This
function is non-decreasing, so you can binary search for the smallest `k` with
`f(k) >= n` — that `k` is the answer.

### Hint 2

Counting multiples is a classic inclusion–exclusion job: add the multiples of
each of `a`, `b`, `c`, subtract the multiples of each pairwise least common
multiple, then add back the multiples of `lcm(a, b, c)`.

### Hint 3

The least common multiples can reach `10¹⁸`, far beyond 32-bit range. Derive
each `lcm` from a `gcd` and keep every intermediate in 64-bit (or equivalent)
arithmetic.

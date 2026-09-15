# Concatenate Non-Zero Digits and Multiply by Sum I

## Description

You are given a non-negative integer `n`.

Form a new integer `x` by concatenating all the non-zero digits of `n` in
their original order — every digit `0` in the decimal representation of
`n` simply disappears, and whatever survives reads back as one ordinary
integer. If `n` contains no non-zero digit at all, then `x` is `0`. Let
`sum` be the sum of the digits of `x`.

Return the value of `x * sum`.

### Example 1

```text
Input: n = 10203004
Output: 12340
Explanation: The non-zero digits of 10203004 are 1, 2, 3 and 4, so
x = 1234. Their sum is sum = 1 + 2 + 3 + 4 = 10, and the answer is
x * sum = 1234 * 10 = 12340.
```

### Example 2

```text
Input: n = 1000
Output: 1
Explanation: The only non-zero digit is 1, so x = 1 and sum = 1. The
answer is x * sum = 1 * 1 = 1.
```

### Constraints

- `0 <= n <= 10⁹`

## Hints

### Hint 1

Simulate the construction exactly as described: collect the surviving
digits, add them up, and multiply.

# Monotone Increasing Digits

## Description

An integer has **monotone increasing digits** if and only if each pair of
adjacent digits `x` and `y` satisfy `x <= y`.

Given an integer `n`, return the largest number that is less than or equal
to `n` with monotone increasing digits.

### Example 1

```text
Input: n = 10
Output: 9
```

### Example 2

```text
Input: n = 1234
Output: 1234
```

### Example 3

```text
Input: n = 332
Output: 299
```

### Constraints

- `0 <= n <= 10⁹`

## Hints

### Hint 1

Build the answer digit by digit, adding the largest possible one that would
make the number still less than or equal to `n`.

# Three Divisors

## Description

Given an integer `n`, return `true` if `n` has exactly three positive
divisors. Otherwise, return `false`.

An integer `m` is a divisor of `n` if there exists an integer `k` such that
`n = k * m`.

### Example 1

```text
Input: n = 2
Output: false
Explantion: 2 has only two divisors: 1 and 2.
```

### Example 2

```text
Input: n = 4
Output: true
Explantion: 4 has three divisors: 1, 2, and 4.
```

### Constraints

- `1 <= n <= 10⁴`

## Hints

### Hint 1

You can count the number of divisors and just check that they are 3

### Hint 2

Beware of the case of n equal 1 as some solutions might fail in it

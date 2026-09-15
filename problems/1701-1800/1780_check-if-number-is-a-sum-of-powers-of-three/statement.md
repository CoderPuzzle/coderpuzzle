# Check if Number is a Sum of Powers of Three

## Description

Given an integer `n`, return `true` if it is possible to represent `n` as
the sum of distinct powers of three. Otherwise, return `false`.

An integer `y` is a power of three if there exists an integer `x` such that
`y == 3ˣ`.

### Example 1

```text
Input: n = 12
Output: true
Explanation: 12 = 3¹ + 3²
```

### Example 2

```text
Input: n = 91
Output: true
Explanation: 91 = 3⁰ + 3² + 3⁴
```

### Example 3

```text
Input: n = 21
Output: false
```

### Constraints

- `1 <= n <= 10⁷`

## Hints

### Hint 1

Let's note that the maximum power of 3 you'll use in your soln is 3¹⁶.

### Hint 2

The number can not be represented as a sum of powers of 3 if it's ternary
presentation has a 2 in it.

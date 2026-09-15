# Integers With Multiple Sum of Two Cubes

## Description

You are given an integer `n`.

An integer `x` is considered good if there exist at least two distinct pairs
`(a, b)` such that:

- `a` and `b` are positive integers.
- `a <= b`
- `x = a³ + b³`

Return an array containing all good integers less than or equal to `n`,
sorted in ascending order.

### Example 1

```text
Input: n = 4104
Output: [1729,4104]
Explanation:
    Among integers less than or equal to 4104, the good integers are:

        1729: 1³ + 12³ = 1729 and 9³ + 10³ = 1729.
        4104: 2³ + 16³ = 4104 and 9³ + 15³ = 4104.

    Thus, the answer is [1729, 4104].
```

### Example 2

```text
Input: n = 578
Output: []
Explanation:
    There are no good integers less than or equal to 578, so the answer is
    an empty array.
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

Iterate over all pairs `(a, b)` with `a <= b` and `a³ + b³ <= n`.

### Hint 2

Use a map to count how many times each value of `a³ + b³` appears.

### Hint 3

A value is good if it can be formed by at least two distinct pairs.

### Hint 4

Collect all such values and return them in sorted order.

# Count K-th Roots in a Range

## Description

You are given three integers `l`, `r`, and `k`.

An integer `y` is said to be a perfect `k`th power if there exists an integer
`x` such that `y = xᵏ`.

Return the number of integers `y` in the range `[l, r]` (inclusive) that are
perfect `k`th powers.

### Example 1

```text
Input: l = 1, r = 9, k = 3
Output: 2
Explanation:
    The perfect cubes in the range [1, 9] are:
    1 = 1³
    8 = 2³
    Hence, the answer is 2.
```

### Example 2

```text
Input: l = 8, r = 30, k = 2
Output: 3
Explanation:
    The perfect squares in the range [8, 30] are:
    9 = 3²
    16 = 4²
    25 = 5²
    Hence, the answer is 3.
```

### Constraints

- `0 <= l <= r <= 10⁹`
- `1 <= k <= 30`

## Hints

### Hint 1

Count how many perfect `k`th powers are at most `r`, then subtract how many
are less than `l`.

### Hint 2

For `k >= 2`, find the largest `x` such that `xᵏ` does not exceed the bound.

### Hint 3

Be careful of the edge case `k == 1`.

### Hint 4

Be careful of the edge case `l == 0`.

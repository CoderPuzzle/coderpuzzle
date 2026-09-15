# Reordered Power of 2

## Description

Given an integer `n`, its digits may be written in any order — the original
order included — provided the first digit of the result is not zero.

Return `true` if the digits of `n` can be reordered this way into a power
of two, and `false` otherwise.

### Example 1

```text
Input: n = 1
Output: true
Explanation:
1 itself is 2⁰, so the original order already works.
```

### Example 2

```text
Input: n = 10
Output: false
Explanation:
The reorderings are 10 and 01; 01 has a leading zero, and 10 is not a
power of two.
```

### Constraints

- `1 <= n <= 10⁹`

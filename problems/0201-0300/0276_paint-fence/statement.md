# Paint Fence

## Description

You are painting a fence of `n` posts with `k` different colors. You must
paint the posts following these rules:

- Every post must be painted exactly one color.
- There cannot be three or more consecutive posts with the same color.

Given the two integers `n` and `k`, return the number of ways you can paint
the fence.

### Example 1

![diagram](figures/276-1.svg)

```text
Input: n = 3, k = 2
Output: 6
Explanation: Of the eight ways to paint three posts with two colors, painting
all the posts red or all the posts green is invalid because there cannot be
three posts in a row with the same color.
```

### Example 2

```text
Input: n = 1, k = 1
Output: 1
```

### Example 3

```text
Input: n = 7, k = 2
Output: 42
```

### Constraints

- `1 <= n <= 50`
- `1 <= k <= 10⁵`
- The testcases are generated such that the answer is in the range
  `[0, 2³¹ - 1]` for the given `n` and `k`.

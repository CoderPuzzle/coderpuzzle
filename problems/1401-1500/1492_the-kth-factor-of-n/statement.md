# The kth Factor of n

## Description

You are given two positive integers `n` and `k`. A factor of an integer
`n` is defined as an integer `i` where `n % i == 0`.

Consider the list of all factors of `n` sorted in ascending order; return
the `k`-th factor in this list, or return `-1` if `n` has fewer than `k`
factors.

### Example 1

```text
Input: n = 12, k = 3
Output: 3
Explanation: The factors list is [1, 2, 3, 4, 6, 12]; the 3rd factor is 3.
```

### Example 2

```text
Input: n = 7, k = 2
Output: 7
Explanation: The factors list is [1, 7]; the 2nd factor is 7.
```

### Example 3

```text
Input: n = 4, k = 4
Output: -1
Explanation: The factors list is [1, 2, 4]; there are only 3 factors, so
we return -1.
```

### Constraints

- `1 <= k <= n <= 1000`

## Hints

### Hint 1

The factors of `n` always lie in the range `[1, n]`.

### Hint 2

Loop `i` from `1` to `n`, collecting values with `n % i == 0`; return the
`k`-th one if it exists.

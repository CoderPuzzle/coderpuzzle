# Smallest All-Ones Multiple

## Description

You are given a positive integer `k`.

Find the smallest integer `n` divisible by `k` that consists of only the digit
1 in its decimal representation (e.g., 1, 11, 111, ...).

Return an integer denoting the number of digits in the decimal representation
of `n`. If no such `n` exists, return `-1`.

### Example 1

```text
Input: k = 3
Output: 3
Explanation: n = 111 because 111 is divisible by 3, but 1 and 11 are not.
The length of n = 111 is 3.
```

### Example 2

```text
Input: k = 7
Output: 6
Explanation: n = 111111. The length of n = 111111 is 6.
```

### Example 3

```text
Input: k = 2
Output: -1
Explanation: There does not exist a valid n that is a multiple of 2.
```

### Constraints

- `2 <= k <= 10⁵`

## Hints

### Hint 1

Notice that `n % k` should be 0.

### Hint 2

Build the number digit-by-digit using only modulo `k`. Start with remainder
`rem = 1 % k`. Repeatedly update `rem = (rem * 10 + 1) % k` while counting how
many 1s have been appended.

### Hint 3

Continue until `rem == 0` or a remainder repeats (which indicates a cycle and
that no such n exists).

# Minimum Suffix Flips

## Description

You are given a 0-indexed binary string `target` of length `n`. You also
have another binary string `s` of length `n`, initially set to all
zeros. You want to make `s` equal to `target`.

In one operation you pick an index `i` where `0 <= i < n` and flip every
bit in the inclusive range `[i, n - 1]`. Flipping changes `'0'` to `'1'`
and `'1'` to `'0'`.

Return the minimum number of operations needed to make `s` equal to
`target`.

### Example 1

```text
Input: target = "10111"
Output: 3
Explanation: Initially, s = "00000".
Choose index i = 2: "00000" -> "00111"
Choose index i = 0: "00111" -> "11000"
Choose index i = 1: "11000" -> "10111"
We need at least 3 flip operations to form target.
```

### Example 2

```text
Input: target = "101"
Output: 3
Explanation: Initially, s = "000".
Choose index i = 0: "000" -> "111"
Choose index i = 1: "111" -> "100"
Choose index i = 2: "100" -> "101"
We need at least 3 flip operations to form target.
```

### Example 3

```text
Input: target = "00000"
Output: 0
Explanation: We do not need any operations since the initial s already
equals target.
```

### Constraints

- `n == target.length`
- `1 <= n <= 10⁵`
- `target[i]` is either `'0'` or `'1'`.

## Hints

### Hint 1

Consider a strategy where the chosen indices are increasing. With such a
strategy, you no longer need to worry about bits that have already been
set to the left.

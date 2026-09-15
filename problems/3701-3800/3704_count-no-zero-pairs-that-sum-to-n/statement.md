# Count No-Zero Pairs That Sum to N

## Description

A no-zero integer is a positive integer that does not contain the digit `0` in
its decimal representation.

Given an integer `n`, count the number of pairs `(a, b)` where:

- `a` and `b` are no-zero integers.
- `a + b = n`

Return an integer denoting the number of such pairs.

### Example 1

```text
Input: n = 2
Output: 1
Explanation:
The only pair is (1, 1).
```

### Example 2

```text
Input: n = 3
Output: 2
Explanation:
The pairs are (1, 2) and (2, 1).
```

### Example 3

```text
Input: n = 11
Output: 8
Explanation:
The pairs are (2, 9), (3, 8), (4, 7), (5, 6), (6, 5), (7, 4), (8, 3), and (9, 2). Note that (1, 10) and (10, 1) do not satisfy the conditions because 10 contains 0 in its decimal representation.
```

### Constraints

- `2 <= n <= 10^15`

## Hints

### Hint 1

Use digit DP over the decimal representation of n.

### Hint 2

At each digit, track whether a carry is present and whether a or b has used a zero so far.

### Hint 3

Transition by choosing digits for a and b that add up (with the carry) to the current digit of n.

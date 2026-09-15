# Maximum Value of an Alternating Sequence

## Description

You are given three integers `n`, `s`, and `m`.

A sequence `seq` of integers of length `n` is considered valid if:

- `seq[0] = s`.
- The sequence is alternating, meaning that either:
    - `seq[0] > seq[1] < seq[2] > ...`, or
    - `seq[0] < seq[1] > seq[2] < ...`.
- For every adjacent pair, `|seq[i] - seq[i - 1]| <= m`.

A sequence of length `1` is considered alternating.

Return the maximum possible element that can appear in any valid sequence.

### Example 1

```text
Input: n = 4, s = 3, m = 5
Output: 12
Explanation:
    One valid sequence is [3, 8, 7, 12].
    The maximum element in the sequence is 12.
```

### Example 2

```text
Input: n = 2, s = 4, m = 3
Output: 7
Explanation:
    One valid sequence is [4, 7].
    The maximum element in the sequence is 7.
```

### Constraints

- `1 <= n, s <= 10⁹`
- `1 <= m <= 10⁵`

## Hints

### Hint 1

To make values grow as much as possible, use the maximum allowed increase `m`
when moving to a high point.

### Hint 2

Between two high points, there must be a lower element. To lose as little
value as possible, make that lower element smaller by only `1`.

### Hint 3

Therefore, after the first high point, every two additional positions can
increase the maximum reachable high value by `m - 1`.

### Hint 4

Consider both possible alternating patterns: starting with a decrease and
starting with an increase.

### Hint 5

Handle `n == 1` separately.

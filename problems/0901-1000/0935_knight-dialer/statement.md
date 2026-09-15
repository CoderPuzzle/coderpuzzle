# Knight Dialer

## Description

The chess knight has a unique movement, it may move two squares vertically
and one square horizontally, or two squares horizontally and one square
vertically (with both forming the shape of an L).

![diagram](figures/935-1.svg)

We have a chess knight and a phone pad as shown below. The knight can only
stand on a numeric cell, never on `*` or `#`.

| 1   | 2   | 3   |
| --- | --- | --- |
| 4   | 5   | 6   |
| 7   | 8   | 9   |
| *   | 0   | #   |

![diagram](figures/935-2.svg)

Given an integer `n`, return how many distinct phone numbers of length `n`
we can dial.

You are allowed to place the knight on any numeric cell initially and then
you should perform `n - 1` jumps to dial a number of length `n`. All jumps
should be valid knight jumps.

As the answer may be very large, return the answer modulo 10⁹ + 7.

### Example 1

```text
Input: n = 1
Output: 10
Explanation: We need to dial a number of length 1, so placing the knight
over any numeric cell of the 10 cells is sufficient.
```

### Example 2

```text
Input: n = 2
Output: 20
Explanation: All the valid numbers we can dial are [04, 06, 16, 18, 27, 29,
34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94].
```

### Example 3

```text
Input: n = 3131
Output: 136006598
Explanation: Please take care of the mod.
```

### Constraints

- `1 <= n <= 5000`

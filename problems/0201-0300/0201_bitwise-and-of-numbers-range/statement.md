# Bitwise AND of Numbers Range

## Description

Given two integers `left` and `right` that represent the range `[left, right]`,
return the bitwise AND of all numbers in this range, inclusive.

### Example 1

```text
Input: left = 5, right = 7
Output: 4
```

### Example 2

```text
Input: left = 0, right = 0
Output: 0
```

### Example 3

```text
Input: left = 1, right = 2147483647
Output: 0
```

### Constraints

- `0 <= left <= right <= 2³¹ - 1`

## Hints

### Hint 1

If the range spans a power-of-two boundary, the AND of every number in it is 0.

### Hint 2

The answer is the common binary prefix of left and right; every lower bit differs somewhere across the range and gets zeroed.

### Hint 3

Shift both numbers right until they are equal, counting the shifts, then shift the value back left.

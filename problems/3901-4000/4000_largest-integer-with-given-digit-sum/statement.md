# Largest Integer With Given Digit Sum

## Description

You are given two non-negative integers `n` and `s`.

Return the largest integer that has at most `n` digits and whose sum of digits
is `s`. If no such integer exists, return `-1`.

### Example 1

```text
Input: n = 2, s = 9
Output: 90
Explanation: The largest integer with at most 2 digits that has a sum of
digits of 9 is 90.
```

### Example 2

```text
Input: n = 2, s = 19
Output: -1
Explanation: There is no integer with at most 2 digits that has a sum of
digits of 19, so the answer is -1.
```

### Example 3

```text
Input: n = 5, s = 0
Output: 0
Explanation: The only non-negative integer whose digits sum to 0 is 0.
```

### Constraints

- `1 <= n <= 5`
- `0 <= s <= 100`

## Hints

### Hint 1

Brute force works because `n <= 5`.

### Hint 2

To maximize the integer, assign as much of the remaining digit sum as
possible to each digit from left to right.

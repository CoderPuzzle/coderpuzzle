# Strobogrammatic Number III

## Description

Given two strings `low` and `high` that represent two integers `low` and
`high` where `low <= high`, return the number of strobogrammatic numbers in
the range `[low, high]`.

A strobogrammatic number is a number that looks the same when rotated 180
degrees (looked at upside down).

### Example 1

```text
Input: low = "50", high = "100"
Output: 3
Explanation: The strobogrammatic numbers in the range are 69, 88, and 96.
```

### Example 2

```text
Input: low = "0", high = "0"
Output: 1
Explanation: 0 rotated 180 degrees is still 0.
```

### Constraints

- `1 <= low.length, high.length <= 15`
- `low` and `high` consist of only digits.
- `low <= high` where `low` and `high` are integers.
- `low` and `high` do not contain any leading zeros except for zero itself.

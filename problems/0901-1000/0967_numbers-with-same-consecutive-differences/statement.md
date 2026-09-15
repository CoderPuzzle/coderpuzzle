# Numbers With Same Consecutive Differences

## Description

Given two integers `n` and `k`, return an array of all the integers of length
`n` in which the difference between every two consecutive digits is `k`: read
left to right, each digit sits exactly `k` above or below the digit before it.

The integers must not have leading zeros — written forms such as `02` or `043`
do not count as integers here — so the first digit of every returned number is
one of `1` through `9`.

The original exercise accepts the answer in any order; this judge compares
arrays exactly, so pin one deterministic form: return the integers in ascending
order — the two outputs below already follow it.

### Example 1

```text
Input: n = 3, k = 7
Output: [181,292,707,818,929]
Explanation: 070 would also walk in steps of 7 (0 to 7, then 7 back to 0), but
it begins with the digit 0, so it is not an integer of the required kind.
```

### Example 2

```text
Input: n = 2, k = 1
Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
Explanation: Every number's two digits differ by exactly 1. The digit pair
0 and 1 appears only as 10 — 01 would carry a leading zero.
```

### Constraints

- `2 <= n <= 9`
- `0 <= k <= 9`

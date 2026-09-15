# Student Attendance Record II

## Description

An attendance record for a student can be represented as a string where each
character signifies whether the student was absent, late, or present on that
day. The record only contains the following three characters:

- `'A'`: Absent.
- `'L'`: Late.
- `'P'`: Present.

Any student is eligible for an attendance award if they meet both of the
following criteria:

- The student was absent (`'A'`) for strictly fewer than `2` days total.
- The student was never late (`'L'`) for `3` or more consecutive days.

Given an integer `n`, return the number of possible attendance records of
length `n` that make a student eligible for an attendance award. The answer
may be very large, so return it modulo `10^9 + 7`.

### Example 1

```text
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
```

### Example 2

```text
Input: n = 1
Output: 3
```

### Example 3

```text
Input: n = 10101
Output: 183236316
```

### Constraints

- `1 <= n <= 10^5`

## Hints

### Hint 1

Let dp[a][l] be the number of eligible prefixes with a absences so far (0 or 1) and l trailing consecutive lates (0, 1, or 2).

### Hint 2

Appending 'P' resets l to 0, appending 'L' increments l (only if l < 2), and appending 'A' increments a and resets l (only if a < 1 before).

### Hint 3

The answer is the sum of all dp states after n days, taken modulo 10^9 + 7.

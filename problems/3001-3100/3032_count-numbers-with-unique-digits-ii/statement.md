# Count Numbers With Unique Digits II

## Description

Given two positive integers `a` and `b`, return the count of numbers having
unique digits in the range `[a, b]` (inclusive).

### Example 1

```text
Input: a = 1, b = 20
Output: 19
Explanation: All the numbers in the range [1, 20] have unique digits except 11. Hence, the answer is 19.
```

### Example 2

```text
Input: a = 9, b = 19
Output: 10
Explanation: All the numbers in the range [9, 19] have unique digits except 11. Hence, the answer is 10.
```

### Example 3

```text
Input: a = 80, b = 120
Output: 27
Explanation: There are 41 numbers in the range [80, 120], 27 of which have unique digits.
```

### Constraints

- `1 <= a <= b <= 1000`

## Hints

### Hint 1

You can traverse over all numbers and check if the current number has unique
digits or not.

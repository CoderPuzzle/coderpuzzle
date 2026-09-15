# Digit Count in Range

## Description

Given a single-digit integer `d` and two integers `low` and `high`, return the number
of times that `d` occurs as a digit in all integers in the inclusive range `[low, high]`.

### Example 1

```text
Input: d = 1, low = 1, high = 13
Output: 6
Explanation: The digit d = 1 occurs 6 times in 1, 10, 11, 12, 13.
Note that the digit d = 1 occurs twice in the number 11.
```

### Example 2

```text
Input: d = 3, low = 100, high = 250
Output: 35
Explanation: The digit d = 3 occurs 35 times in 103,113,123,130,131,...,238,239,243.
```

### Constraints

- `0 <= d <= 9`
- `1 <= low <= high <= 2 * 10^8`

## Hints

### Hint 1

Define f(x) as the number of times d occurs in all integers from 1 to x; the answer is f(high) - f(low - 1).

### Hint 2

Compute f(x) with digit DP: for each digit position, count how many integers up to x have the digit d at that position.

### Hint 3

Handle d = 0 carefully, since leading zeros never count.

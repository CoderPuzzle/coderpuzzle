# Remove K Digits

## Description

Given string `num` representing a non-negative integer `num`, and an
integer `k`, return the smallest possible integer after removing `k` digits
from `num`.

### Example 1

```text
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

### Example 2

```text
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
```

### Example 3

```text
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
```

### Constraints

- `1 <= k <= num.length <= 10^5`
- `num` consists of only digits.
- `num` does not have any leading zeros except for the zero itself.

## Hints

### Hint 1

Scan left to right with a stack: while the previous kept digit is larger than the current one, pop it (removing a digit before a smaller one always helps) and spend one removal.

### Hint 2

If removals are left over after the scan, drop them from the end of the stack — the largest remaining digits sit there.

### Hint 3

Strip leading zeros from the result, and return "0" if nothing remains.

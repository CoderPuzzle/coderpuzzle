# Count Odd Numbers in an Interval Range

## Description

Given two non-negative integers `low` and `high`, return the count of odd
numbers between `low` and `high` (inclusive).

### Example 1

```text
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].
```

### Example 2

```text
Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].
```

### Constraints

- `0 <= low <= high <= 10⁹`

## Hints

### Hint 1

If the range (`high - low + 1`) is even, the number of even and odd
numbers in this range will be the same.

### Hint 2

If the range (`high - low + 1`) is odd, the solution will depend on the
parity of `high` and `low`.

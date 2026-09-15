# Number of Digit One

## Description

Given an integer `n`, count the total number of digit `1` appearing in all
non-negative integers less than or equal to `n`.

### Example 1

```text
Input: n = 13
Output: 6
```

### Example 2

```text
Input: n = 0
Output: 0
```

### Constraints

- `0 <= n <= 10^9`

## Hints

### Hint 1

Beware of overflow.

### Hint 2

Count the occurrences of the digit 1 one decimal place at a time, from the ones place upward.

### Hint 3

For a place with value p, the higher digits determine how many full cycles contribute a 1 there, while the current digit controls the partial cycle's contribution.

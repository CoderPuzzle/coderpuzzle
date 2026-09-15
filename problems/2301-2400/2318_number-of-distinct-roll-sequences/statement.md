# Number of Distinct Roll Sequences

## Description

You are given an integer `n`. You roll a fair 6-sided dice `n` times. Determine
the total number of distinct sequences of rolls possible such that the
following conditions are satisfied:

- The greatest common divisor of any adjacent values in the sequence is equal
  to 1.
- There is at least a gap of 2 rolls between equal valued rolls. More
  formally, if the value of the `i`th roll is equal to the value of the `j`th
  roll, then `abs(i - j) > 2`.

Return the total number of distinct sequences possible. Since the answer may
be very large, return it modulo `10^9 + 7`.

Two sequences are considered distinct if at least one element is different.

### Example 1

```text
Input: n = 4
Output: 184
Explanation: Some of the possible sequences are (1, 2, 3, 4), (6, 1, 2, 3), (1, 2, 3, 1), etc.
Some invalid sequences are (1, 2, 1, 3), (1, 2, 3, 6).
(1, 2, 1, 3) is invalid since the first and third roll have an equal value and abs(1 - 3) = 2 (i and j are 1-indexed).
(1, 2, 3, 6) is invalid since the greatest common divisor of 3 and 6 = 3.
There are a total of 184 distinct sequences possible, so we return 184.
```

### Example 2

```text
Input: n = 2
Output: 22
Explanation: Some of the possible sequences are (1, 2), (2, 1), (3, 2).
Some invalid sequences are (3, 6), (2, 4) since the greatest common divisor is not equal to 1.
There are a total of 22 distinct sequences possible, so we return 22.
```

### Constraints

- `1 <= n <= 10^4`

## Hints

### Hint 1

Can you think of a DP solution?

### Hint 2

Consider a state that remembers the last 1 or 2 rolls.

### Hint 3

Do you need to consider the last 3 rolls?

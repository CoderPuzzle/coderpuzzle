# Maximize Sum of Squares of Digits

## Description

You are given two positive integers `num` and `sum`.

Call a positive integer good when it has exactly `num` digits and its digits
add up to exactly `sum`.

The score of a good integer is the sum of the squares of its digits.

Return a string containing the good integer whose score is maximal. When
several good integers reach that maximum score, return the largest one among
them. If no good integer exists, return an empty string.

### Example 1

```text
Input: num = 2, sum = 3
Output: "30"
Explanation: The good integers are 12, 21, and 30, and their scores are
1² + 2² = 5, 2² + 1² = 5, and 3² + 0² = 9. The maximum score is 9, achieved
by the good integer 30, so the answer is "30".
```

### Example 2

```text
Input: num = 2, sum = 17
Output: "98"
Explanation: The good integers are 89 and 98, and both score
8² + 9² = 145. The maximum score is 145, and the largest good integer
carrying it is 98, so the answer is "98".
```

### Example 3

```text
Input: num = 1, sum = 10
Output: ""
Explanation: No single digit sums to 10, so no good integer exists.
```

### Constraints

- `1 <= num <= 2 * 10⁵`
- `1 <= sum <= 2 * 10⁶`

## Hints

### Hint 1

Use a greedy approach.

### Hint 2

Fill the leftmost digits with 9s first (as much as possible).

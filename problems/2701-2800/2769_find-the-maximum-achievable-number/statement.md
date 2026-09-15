# Find the Maximum Achievable Number

## Description

Given two integers, `num` and `t`. A number `x` is achievable if it can
become equal to `num` after applying the following operation at most `t`
times:

- Increase or decrease x by 1, and simultaneously increase or decrease num by 1.

Return the maximum possible value of `x`.

### Example 1

```text
Input: num = 4, t = 1
Output: 6
Explanation:
Apply the following operation once to make the maximum achievable number equal to num:
	Decrease the maximum achievable number by 1, and increase num by 1.
```

### Example 2

```text
Input: num = 3, t = 2
Output: 7
Explanation:
Apply the following operation twice to make the maximum achievable number equal to num:
	Decrease the maximum achievable number by 1, and increase num by 1.
```

### Constraints

- `1 <= num <= 50`
- `1 <= t <= 50`

## Hints

### Hint 1

Let x be the answer, it’s always optimal to decrease x in each operation and increase nums.

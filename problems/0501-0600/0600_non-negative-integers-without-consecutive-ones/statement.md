# Non-negative Integers without Consecutive Ones

## Description

Given a positive integer `n`, return the number of the integers in the range
`[0, n]` whose binary representations do not contain consecutive ones.

### Example 1

```text
Input: n = 5
Output: 5
Explanation:
Here are the non-negative integers <= 5 with their corresponding binary representations:
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule.
```

### Example 2

```text
Input: n = 1
Output: 2
```

### Example 3

```text
Input: n = 2
Output: 3
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

Consider the binary representation of n and count valid numbers by scanning the digits from most significant to least significant.

### Hint 2

The number of binary strings of a fixed length with no consecutive ones follows the Fibonacci recurrence.

### Hint 3

When you encounter a 1 bit, choosing 0 at that position lets the remaining lower bits be any valid string of that length.

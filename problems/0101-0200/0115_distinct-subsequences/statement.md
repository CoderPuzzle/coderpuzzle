# Distinct Subsequences

## Description

Given two strings `s` and `t`, return the number of distinct subsequences
of `s` which equal `t`.

The test cases are generated so that the answer fits on a 32-bit signed
integer.

### Example 1

```text
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
```

### Example 2

```text
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag
```

### Constraints

- `1 <= s.length, t.length <= 1000`
- `s` and `t` consist of English letters.

## Hints

### Hint 1

Let dp[i][j] be the number of ways to form the first j characters of t using the first i characters of s.

### Hint 2

When s[i-1] == t[j-1] you can either match the character (dp[i-1][j-1]) or skip it (dp[i-1][j]); when they differ you must skip it.

### Hint 3

A 1-D rolling array updated from right to left keeps the DP in O(len(t)) space.

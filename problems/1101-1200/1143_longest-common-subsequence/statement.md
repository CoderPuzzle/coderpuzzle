# Longest Common Subsequence

## Description

Given two strings `text1` and `text2`, return the length of their longest
common subsequence. If there is no common subsequence, return `0`.

A subsequence of a string is a new string generated from the original string
with some characters (can be none) deleted without changing the relative order
of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

A common subsequence of two strings is a subsequence that is common to both
strings.

### Example 1

```text
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

### Example 2

```text
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

### Example 3

```text
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

### Constraints

- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.

## Hints

### Hint 1

Try dynamic programming: dp[i][j] represents the length of the longest common subsequence of text1[0..i] and text2[0..j].

### Hint 2

dp[i][j] = dp[i-1][j-1] + 1 if text1[i] == text2[j], otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]).

### Hint 3

You only need the previous row of the table, so the DP can run in O(min length) extra space.

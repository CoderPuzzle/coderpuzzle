# Longest Palindromic Subsequence

## Description

Given a string `s`, find the longest palindromic subsequence's length in `s`.

A subsequence is a sequence that can be derived from another sequence by
deleting some or no elements without changing the order of the remaining
elements.

### Example 1

```text
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
```

### Example 2

```text
Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Use interval DP: dp[i][j] is the length of the longest palindromic subsequence of s[i..j].

### Hint 2

If s[i] == s[j], then dp[i][j] = dp[i+1][j-1] + 2; otherwise dp[i][j] = max(dp[i+1][j], dp[i][j-1]).

### Hint 3

Base case dp[i][i] = 1; fill the table by increasing interval length.

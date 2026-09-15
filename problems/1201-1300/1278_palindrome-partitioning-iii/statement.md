# Palindrome Partitioning III

## Description

You are given a string `s` of lowercase English letters and an integer `k`.

In one step you may pick any position of `s` and change its character to any
other lowercase English letter.

First, change some characters of `s`. Then divide `s` into `k` non-empty
disjoint substrings such that each substring is a palindrome.

Return the minimal number of characters you need to change so that `s` can be
divided this way.

### Example 1

```text
Input: s = "abc", k = 2
Output: 1
Explanation: You can split the string into "ab" and "c", and change 1 character in "ab" to make it a palindrome.
```

### Example 2

```text
Input: s = "aabbc", k = 3
Output: 0
Explanation: You can split the string into "aa", "bb" and "c", all of them are palindromes.
```

### Example 3

```text
Input: s = "leetcode", k = 8
Output: 0
```

### Constraints

- `1 <= k <= s.length <= 100`
- `s` consists of lowercase English letters only.

### Follow-up

Can you solve it in O(n²) time for the cost table and O(k · n²) for the
partition DP, with O(n²) extra space in total?

## Hints

### Hint 1

How many characters must change to turn a single substring `s[i..j]` into a
palindrome? Pair up position `i` with `j`, `i+1` with `j-1`, and so on: each
mismatched pair costs exactly one change. This cost depends only on the
interval, so precompute it for all O(n²) intervals.

### Hint 2

Let `cost[i][j]` be that one-change-per-mismatched-pair table. Build it by
increasing interval length: `cost[i][j] = cost[i+1][j-1] + (s[i] != s[j])`,
with empty and single-character intervals costing 0.

### Hint 3

Now run a partition DP over prefixes: `dp[c][i]` is the minimum number of
changes to split the prefix of length `i` into `c` palindromic parts.
The last part is some `s[j..i-1]`, so
`dp[c][i] = min(dp[c-1][j] + cost[j][i-1])` over `j < i`; `dp[1][i]` is just
`cost[0][i-1]`. The answer is `dp[k][n]`.

# Minimum Insertion Steps to Make a String Palindrome

## Description

Given a string `s`. In one step you can insert any character at any index of
the string.

Return the minimum number of steps to make `s` a palindrome.

A palindrome string is one that reads the same backward as well as forward.

### Example 1

```text
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already a palindrome; we do not need any insertions.
```

### Example 2

```text
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
```

### Example 3

```text
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Dynamic programming is suitable for this problem.

### Hint 2

If the longest palindromic subsequence of s has length x and the string has length n, the answer is n - x: each character outside the subsequence needs one matching insertion.

### Hint 3

Equivalently, dp[i][j] can be the minimum insertions to make s[i..j] a palindrome, filling the table by increasing interval length.

# Longest Palindrome After Substring Concatenation II

## Description

You are given two strings, `s` and `t`.

You can create a new string by selecting a substring from `s` (possibly
empty) and a substring from `t` (possibly empty), then concatenating them in
order.

Return the length of the longest palindrome that can be formed this way.

### Example 1

```text
Input: s = "a", t = "a"
Output: 2
Explanation: Concatenating "a" from s and "a" from t results in "aa", which
is a palindrome of length 2.
```

### Example 2

```text
Input: s = "abc", t = "def"
Output: 1
Explanation: Since all characters are different, the longest palindrome is
any single character, so the answer is 1.
```

### Example 3

```text
Input: s = "b", t = "aaaa"
Output: 4
Explanation: Selecting "aaaa" from t is the longest palindrome, so the answer
is 4.
```

### Example 4

```text
Input: s = "abcde", t = "ecdba"
Output: 5
Explanation: Concatenating "abc" from s and "ba" from t results in "abcba",
which is a palindrome of length 5.
```

### Constraints

- `1 <= s.length, t.length <= 1000`
- `s` and `t` consist of lowercase English letters.

## Hints

### Hint 1

Let `dp[i][j]` be the length of the longest answer if we try starting it
with `s[i]` and ending it with `t[j]`.

### Hint 2

For `s`, preprocess the length of the longest palindrome starting at index
`i` as `p[i]`.

### Hint 3

For `t`, preprocess the length of the longest palindrome ending at index `j`
as `q[j]`.

### Hint 4

If `s[i] != t[j]`, then `dp[i][j] = max(p[i], q[j])`.

### Hint 5

Otherwise, `dp[i][j] = max(p[i], q[j], 2 + dp[i + 1][j - 1])`.

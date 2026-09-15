# Regular Expression Matching

## Description

Given an input string `s` and a pattern `p`, implement regular expression
matching with support for `'.'` and `'*'` where:

- `'.'` Matches any single character.
- `'*'` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

### Example 1

```text
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

### Example 2

```text
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

### Example 3

```text
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

### Constraints

- `1 <= s.length <= 20`
- `1 <= p.length <= 20`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `'.'`, and `'*'`.
- It is guaranteed for each appearance of the character `'*'`, there will be a
  previous valid character to match.

## Hints

### Hint 1

Let dp[i][j] be whether the first i characters of s match the first j characters of p.

### Hint 2

A '*' at p[j-1] lets the pattern element before it be skipped (dp[i][j-2]) or consume one matching character (dp[i-1][j] when p[j-2] matches s[i-1]).

### Hint 3

Without '*', dp[i][j] follows dp[i-1][j-1] plus a single-character match.

### Hint 4

Seed dp[0][0] = true and handle patterns like "a*b*" that match the empty prefix.

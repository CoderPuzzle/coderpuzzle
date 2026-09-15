# Longest Common Prefix After at Most One Removal

## Description

You are given two strings s and t.

Return the length of the longest common prefix between s and t after
removing at most one character from s.

Note: s can be left without any removal.

### Example 1

```text
Input: s = "madxa", t = "madam"
Output: 4
Explanation: Removing s[3] from s results in "mada", which has a longest
common prefix of length 4 with t.
```

### Example 2

```text
Input: s = "leetcode", t = "eetcode"
Output: 7
Explanation: Removing s[0] from s results in "eetcode", which matches t.
```

### Example 3

```text
Input: s = "one", t = "one"
Output: 3
Explanation: No removal is needed.
```

### Example 4

```text
Input: s = "a", t = "b"
Output: 0
Explanation: s and t cannot have a common prefix.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `1 <= t.length <= 10⁵`
- `s` and `t` contain only lowercase English letters.

## Hints

### Hint 1

Maintain pointers to the beginning of both strings and remove the first
position where they differ in s (if any).

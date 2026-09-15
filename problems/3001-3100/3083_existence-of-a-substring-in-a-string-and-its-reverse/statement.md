# Existence of a Substring in a String and Its Reverse

## Description

Given a string s, find any substring of length 2 which is also present in the
reverse of s.

Return true if such a substring exists, and false otherwise.

### Example 1

```text
Input: s = "leetcode"
Output: true
Explanation: Substring "ee" is of length 2 which is also present in
reverse(s) == "edocteel".
```

### Example 2

```text
Input: s = "abcba"
Output: true
Explanation: All of the substrings of length 2 "ab", "bc", "cb", "ba" are
also present in reverse(s) == "abcba".
```

### Example 3

```text
Input: s = "abcd"
Output: false
Explanation: There is no substring of length 2 in s, which is also present
in the reverse of s.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Make a new string by reversing the string s.

### Hint 2

For every substring of length 2 in s, check if there is a corresponding
substring in the reverse of s.

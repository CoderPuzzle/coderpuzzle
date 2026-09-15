# Length of the Longest Alphabetical Continuous Substring

## Description

An alphabetical continuous string is a string consisting of consecutive
letters in the alphabet. In other words, it is any substring of the string
"abcdefghijklmnopqrstuvwxyz".

For example, "abc" is an alphabetical continuous string, while "acb" and
"za" are not.

Given a string `s` consisting of lowercase letters only, return the length
of the longest alphabetical continuous substring.

### Example 1

```text
Input: s = "abacaba"
Output: 2
Explanation: There are 4 distinct continuous substrings: "a", "b", "c" and "ab".
"ab" is the longest continuous substring.
```

### Example 2

```text
Input: s = "abcde"
Output: 5
Explanation: "abcde" is the longest continuous substring.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of only English lowercase letters.

## Hints

### Hint 1

What is the longest possible continuous substring?

### Hint 2

The size of the longest possible continuous substring is at most 26, so we
can just brute force the answer.

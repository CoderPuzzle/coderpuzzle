# Shortest Palindrome

## Description

You are given a string `s`. You can convert `s` into a palindrome by adding
characters in front of it.

Return the shortest palindrome you can find by performing this transformation.

### Example 1

```text
Input: s = "aacecaaa"
Output: "aaacecaaa"
```

### Example 2

```text
Input: s = "abcd"
Output: "dcbabcd"
```

### Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` consists of lowercase English letters only.

## Hints

### Hint 1

The shortest palindrome is built by finding the longest prefix of s that is already a palindrome, then mirroring the remaining suffix in front of s.

### Hint 2

Reversing s and studying the overlap between s and its reverse reveals where that palindromic prefix ends.

### Hint 3

A KMP prefix-function (or Manacher) computed over s + '#' + reversed(s) locates the longest palindromic prefix in linear time.

### Hint 4

Whatever is left over after the palindromic prefix is the only part that must be prepended, reversed.

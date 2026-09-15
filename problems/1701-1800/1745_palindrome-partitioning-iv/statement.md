# Palindrome Partitioning IV

## Description

Given a string `s`, return `true` if it is possible to split the string
`s` into three non-empty palindromic substrings. Otherwise, return
`false`.

A string is said to be palindrome if it the same string when reversed.

### Example 1

```text
Input: s = "abcbdd"
Output: true
Explanation: "abcbdd" = "a" + "bcb" + "dd", and all three substrings are
palindromes.
```

### Example 2

```text
Input: s = "bcbddxy"
Output: false
Explanation: s cannot be split into 3 palindromes.
```

### Constraints

- `3 <= s.length <= 2000`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Preprocess checking palindromes in `O(1)`.

### Hint 2

Note that one string is a prefix and another one is a suffix you can try
brute forcing the rest.

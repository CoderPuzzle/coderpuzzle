# Longest Palindromic Subsequence II

## Description

A subsequence of a string `s` is called a **good palindromic subsequence**
when all of the following conditions hold:

- It is a subsequence of `s`.
- It is a palindrome: it reads the same forwards and backwards.
- It has even length.
- No two consecutive characters are equal, except for the two middle ones.

For example, when `s = "abcabcabb"`, the subsequence `"abba"` is a good
palindromic subsequence, while `"bcb"` (not of even length) and `"bbbb"`
(it has equal consecutive characters) are not.

Given a string `s`, return the length of the longest good palindromic
subsequence of `s`.

### Example 1

```text
Input: s = "bbabab"
Output: 4
Explanation: The longest good palindromic subsequence of s is "baab".
```

### Example 2

```text
Input: s = "dcbccacdb"
Output: 4
Explanation: The longest good palindromic subsequence of s is "dccd".
```

### Constraints

- `1 <= s.length <= 250`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

As with any dynamic programming problem over palindromes, try building the
palindrome from its two edges inward.

### Hint 2

The crux is enforcing that no two adjacent characters are equal, so carry the
letter of the outermost pair already placed while building the palindrome.

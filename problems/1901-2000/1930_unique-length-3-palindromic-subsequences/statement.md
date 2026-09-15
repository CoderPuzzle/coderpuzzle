# Unique Length-3 Palindromic Subsequences

## Description

Given a string `s`, return the number of unique palindromes of length three
that are a subsequence of `s`.

Note that even if there are multiple ways to obtain the same subsequence, it
is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string
with some characters (can be none) deleted without changing the relative order
of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

### Example 1

```text
Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
```

### Example 2

```text
Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
```

### Example 3

```text
Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
```

### Constraints

- `3 <= s.length <= 10^5`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

A length-3 palindrome is fully determined by its first/last character and its middle character, so there are at most 26 * 26 candidates.

### Hint 2

For each letter, find its first and last occurrence; the palindrome exists if and only if that letter appears at both ends.

### Hint 3

Count the distinct characters strictly between the first and last occurrence to get the valid middle characters for that letter.

# Longest Almost-Palindromic Substring

## Description

You are given a string s consisting of lowercase English letters.

A substring is almost-palindromic if it becomes a palindrome after removing
exactly one character from it.

Return an integer denoting the length of the longest almost-palindromic
substring in s.

### Example 1

```text
Input: s = "abca"
Output: 4
Explanation: Choose the substring "abca". Remove "c". The string becomes
"aba", which is a palindrome. Therefore, "abca" is almost-palindromic.
```

### Example 2

```text
Input: s = "abba"
Output: 4
Explanation: Choose the substring "abba". Remove "b". The string becomes
"aba", which is a palindrome. Therefore, "abba" is almost-palindromic.
```

### Example 3

```text
Input: s = "zzabba"
Output: 5
Explanation: Choose the substring "zabba". Remove "z". The string becomes
"abba", which is a palindrome. Therefore, "zabba" is almost-palindromic.
```

### Constraints

- `2 <= s.length <= 2500`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Solve greedily

### Hint 2

Fix the center (consider both odd and even centers) and expand outwards

### Hint 3

On the first mismatch, try skipping the left character and continue
expanding, and also try skipping the right character; take the longer result

### Hint 4

Track the maximum length found across all centers

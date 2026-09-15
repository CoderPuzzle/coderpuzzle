# Longest Balanced Substring I

## Description

You are given a string s consisting of lowercase English letters.

A substring of s is called balanced when every distinct character it contains
occurs the same number of times. Note that a substring with a single distinct
character is always balanced, whatever its length.

Return the length of the longest balanced substring of s.

### Example 1

```text
Input: s = "abbac"
Output: 4
Explanation: The substring "abba" has two distinct characters, 'a' and 'b',
each appearing exactly 2 times, so it is balanced. No longer balanced
substring exists.
```

### Example 2

```text
Input: s = "zzabccy"
Output: 4
Explanation: The substring "zabc" has four distinct characters — 'z', 'a',
'b', and 'c' — each appearing exactly 1 time. No longer balanced substring
exists.
```

### Example 3

```text
Input: s = "aba"
Output: 2
Explanation: The substrings "ab" and "ba" each have two distinct characters
appearing exactly once, so either is a longest balanced substring.
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Use brute force over all substrings: fixing the left end and sweeping the right end lets you maintain each character count incrementally instead of recounting every window.

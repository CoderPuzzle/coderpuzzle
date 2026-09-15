# Permutation in String

## Description

Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation
of `s1`, or `false` otherwise.

In other words, return `true` if one of `s1`'s permutations is a substring of
`s2`.

### Example 1

```text
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
```

### Example 2

```text
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

### Constraints

- `1 <= s1.length, s2.length <= 10^4`
- `s1` and `s2` consist of lowercase English letters.

## Hints

### Hint 1

Two strings are permutations of each other exactly when their character frequencies match.

### Hint 2

Maintain a frequency count of the length-len(s1) window sliding over s2.

### Hint 3

Slide one character at a time, adding the entering char and removing the leaving char in O(1).

### Hint 4

Brute-force sorting or re-counting every substring is too slow; an array of size 26 (or a hash table) is all you need.

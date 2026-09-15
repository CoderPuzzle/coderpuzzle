# Minimum Length of Anagram Concatenation

## Description

You are given a string s, which is known to be a concatenation of anagrams
of some string t.

Return the minimum possible length of the string t.

An anagram is formed by rearranging the letters of a string. For example,
"aab", "aba", and, "baa" are anagrams of "aab".

### Example 1

```text
Input: s = "abba"
Output: 2
Explanation:
One possible string t could be "ba".
```

### Example 2

```text
Input: s = "cdef"
Output: 4
Explanation:
One possible string t could be "cdef", notice that t can be equal to s.
```

### Example 3

```text
Input: s = "abcbcacabbaccba"
Output: 3
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consist only of lowercase English letters.

## Hints

### Hint 1

The answer should be a divisor of s.length.

### Hint 2

Check each candidate naively.

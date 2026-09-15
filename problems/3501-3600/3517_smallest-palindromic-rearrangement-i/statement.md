# Smallest Palindromic Rearrangement I

## Description

You are given a palindromic string `s`.

Return the lexicographically smallest palindromic permutation of `s`.

### Example 1

```text
Input: s = "z"
Output: "z"
Explanation: A string of only one character is already the lexicographically smallest palindrome.
```

### Example 2

```text
Input: s = "babab"
Output: "abbba"
Explanation: Rearranging "babab" → "abbba" gives the smallest lexicographic palindrome.
```

### Example 3

```text
Input: s = "daccad"
Output: "acddca"
Explanation: Rearranging "daccad" → "acddca" gives the smallest lexicographic palindrome.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters.
- `s` is guaranteed to be palindromic.

## Hints

### Hint 1

Consider a palindrome as composed of two mirror-image halves.

### Hint 2

Construct one half (using s), and then the other half is its reverse to obtain the lexicographically smallest permutation.

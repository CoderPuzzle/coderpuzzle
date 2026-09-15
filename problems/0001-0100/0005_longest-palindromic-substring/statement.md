# Longest Palindromic Substring

## Description

Given a string `s`, return the longest palindromic substring in `s`.

If there are multiple longest palindromic substrings, return the leftmost
one.

### Example 1

```text
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer, but "bab" starts earlier.
```

### Example 2

```text
Input: s = "cbbd"
Output: "bb"
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consist of only digits and English letters.

## Hints

### Hint 1

How can you reuse a previously computed palindrome to compute a larger palindrome? If "aba" is a palindrome, so is "xabax".

### Hint 2

Expand a palindrome around each center: every position is an odd-length center, and every gap between two characters is an even-length center.

### Hint 3

Brute force checks O(n^2) start-end pairs with O(n) palindrome checks; expanding around 2n-1 centers reduces the checks to O(1) each for O(n^2) total.

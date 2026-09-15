# Valid Palindrome III

## Description

Given a string `s` and an integer `k`, return `true` if `s` is a
k-palindrome.

A string is k-palindrome if it can be transformed into a palindrome by
removing at most `k` characters from it.

### Example 1

```text
Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove 'b' and 'e' characters.
```

### Example 2

```text
Input: s = "abbababa", k = 1
Output: true
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of only lowercase English letters.
- `1 <= k <= s.length`

## Hints

### Hint 1

Can you reduce this problem to a classic problem?

### Hint 2

The problem is equivalent to finding any palindromic subsequence of length at least N-K where N is the length of the string.

### Hint 3

Try to find the longest palindromic subsequence.

### Hint 4

Use DP to do that.

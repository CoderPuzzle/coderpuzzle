# Distinct Subsequences II

## Description

Given a string `s`, return the number of distinct **non-empty** subsequences
of `s`. Since the answer may be very large, return it **modulo** 10⁹ + 7.

A subsequence of a string is a new string that is formed from the original
string by deleting some (can be none) of the characters without disturbing the
relative positions of the remaining characters. For example, `"ace"` is a
subsequence of `"abcde"` while `"aec"` is not.

### Example 1

```text
Input: s = "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".
```

### Example 2

```text
Input: s = "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "aa", "ba", and "aba".
```

### Example 3

```text
Input: s = "aaa"
Output: 3
Explanation: The 3 distinct subsequences are "a", "aa" and "aaa".
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Let `dp[i]` be the number of distinct subsequences of the first `i` characters,
including the empty one. Appending character `c` to the prefix doubles the
count — every old subsequence, with and without `c` appended — so
`dp[i] = 2 * dp[i-1]`.

### Hint 2

The doubling overcounts only when `c` appeared before: the subsequences
duplicated are exactly those already counted the last time `c` was appended.
Subtract the count from just before that previous occurrence.

### Hint 3

Because every intermediate value lives below 10⁹ + 7 after each step, do the
arithmetic modulo 10⁹ + 7 as you go (64-bit intermediates), and subtract the
empty subsequence at the very end.

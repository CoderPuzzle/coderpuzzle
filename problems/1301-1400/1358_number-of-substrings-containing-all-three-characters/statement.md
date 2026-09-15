# Number of Substrings Containing All Three Characters

## Description

Given a string `s` consisting only of characters `a`, `b` and `c`.

Return the number of substrings containing at least one occurrence of all
these characters `a`, `b` and `c`.

### Example 1

```text
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
```

### Example 2

```text
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".
```

### Example 3

```text
Input: s = "abc"
Output: 1
```

### Constraints

- `3 <= s.length <= 5 * 10^4`
- `s` consists only of `'a'`, `'b'` or `'c'` characters.

## Hints

### Hint 1

For each position, find the first occurrence of a, b and c on or after that position; every substring starting there and ending at or after the latest of the three first occurrences is valid.

### Hint 2

Precompute the last seen index of each of the three characters while scanning; the number of valid substrings ending at position i is min(last_a, last_b, last_c) + 1.

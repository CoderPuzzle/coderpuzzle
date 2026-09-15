# Count Substrings With K-Frequency Characters II

## Description

Given a string s and an integer k, return the total number of substrings
of s where at least one character appears at least k times.

### Example 1

```text
Input: s = "abacb", k = 2
Output: 4
Explanation:
- "aba" (character 'a' appears 2 times).
- "abac" (character 'a' appears 2 times).
- "abacb" (character 'a' appears 2 times).
- "bacb" (character 'b' appears 2 times).
```

### Example 2

```text
Input: s = "abcde", k = 1
Output: 15
Explanation: All substrings are valid because every character appears at
least once.
```

### Constraints

- `1 <= s.length <= 3 * 10⁵`
- `1 <= k <= s.length`
- `s consists only of lowercase English letters.`

## Hints

### Hint 1

If substring [i, j] is valid, then for all k >= j, [i, k] is valid too.

### Hint 2

For each i, find j with a sliding window or binary search.

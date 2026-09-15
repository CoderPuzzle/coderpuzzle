# Number of Wonderful Substrings

## Description

A **wonderful** string is a string where at most one letter appears an odd
number of times.

- For example, "ccjjc" and "abab" are wonderful, but "ab" is not.

Given a string `word` that consists of the first ten lowercase English
letters ('a' through 'j'), return the number of wonderful non-empty
substrings in `word`. If the same substring appears multiple times in
`word`, then count each occurrence separately.

A substring is a contiguous sequence of characters in a string.

### Example 1

```text
Input: word = "aba"
Output: 4
Explanation: The four wonderful substrings are underlined below:
- "aba" -> "a"
- "aba" -> "b"
- "aba" -> "a"
- "aba" -> "aba"
```

### Example 2

```text
Input: word = "aabb"
Output: 9
Explanation: The nine wonderful substrings are underlined below:
- "aabb" -> "a"
- "aabb" -> "aa"
- "aabb" -> "aab"
- "aabb" -> "aabb"
- "aabb" -> "a"
- "aabb" -> "abb"
- "aabb" -> "b"
- "aabb" -> "bb"
- "aabb" -> "b"
```

### Example 3

```text
Input: word = "he"
Output: 2
Explanation: The two wonderful substrings are underlined below:
- "he" -> "h"
- "he" -> "e"
```

### Constraints

- `1 <= word.length <= 10^5`
- `word` consists of lowercase English letters from 'a' to 'j'.

## Hints

### Hint 1

For each prefix of the string, record which characters have appeared an odd number of times so far as a 10-bit mask.

### Hint 2

A substring is wonderful exactly when the masks at its two ends are equal or differ in a single bit.

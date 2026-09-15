# Last Substring in Lexicographical Order

## Description

Given a string `s`, return the last substring of `s` in lexicographical order.

### Example 1

```text
Input: s = "abab"
Output: "bab"
Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".
```

### Example 2

```text
Input: s = "leetcode"
Output: "tcode"
```

### Constraints

- `1 <= s.length <= 4 * 10⁵`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Assume that the answer is a sub-string from index i to j. If you add the character at index j+1 you get a better answer.

### Hint 2

The answer is always a suffix of the given string.

### Hint 3

Since the limits are high, we need an efficient data structure.

### Hint 4

Use a suffix array.

# Longest Repeating Substring

## Description

Given a string `s`, return the length of the longest repeating substrings. If
no repeating substring exists, return `0`.

### Example 1

```text
Input: s = "abcd"
Output: 0
Explanation: There is no repeating substring.
```

### Example 2

```text
Input: s = "abbaba"
Output: 2
Explanation: The longest repeating substrings are "ab" and "ba", each of
which occurs twice.
```

### Example 3

```text
Input: s = "aabcaabdaab"
Output: 3
Explanation: The longest repeating substring is "aab", which occurs 3 times.
```

### Constraints

- `1 <= s.length <= 2000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

If a repeating substring of length L exists, then a repeating substring of every length below L also exists — so the answer can be binary searched.

### Hint 2

For a fixed length L, check for a duplicate among all substrings of length L using a hash set.

### Hint 3

A rolling hash (or suffix array) avoids materializing the substrings and keeps each check near linear time.

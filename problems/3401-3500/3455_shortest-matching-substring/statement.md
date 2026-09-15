# Shortest Matching Substring

## Description

You are given a string `s` and a pattern string `p`, where `p` contains exactly
two `'*'` characters.

The `'*'` in `p` matches any sequence of zero or more characters.

Return the length of the shortest substring in `s` that matches `p`. If there
is no such substring, return `-1`.

Note: The empty substring is considered valid.

### Example 1

```text
Input: s = "abaacbaecebce", p = "ba*c*ce"
Output: 8
Explanation: The shortest matching substring of p in s is "baecebce".
```

### Example 2

```text
Input: s = "baccbaadbc", p = "cc*baa*adb"
Output: -1
Explanation: There is no matching substring in s.
```

### Example 3

```text
Input: s = "a", p = "**"
Output: 0
Explanation: The empty substring is the shortest matching substring.
```

### Example 4

```text
Input: s = "madlogic", p = "*adlogi*"
Output: 6
Explanation: The shortest matching substring of p in s is "adlogi".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `2 <= p.length <= 10⁵`
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters and exactly two `'*'`.

## Hints

### Hint 1

The pattern string p can be divided into three segments by its two '*' characters.

### Hint 2

Locate all occurrences of each non-empty segment in s using a string matching algorithm such as KMP.

### Hint 3

Choose one occurrence of each non-empty segment in order and minimize the span from the first segment's start to the last segment's end.

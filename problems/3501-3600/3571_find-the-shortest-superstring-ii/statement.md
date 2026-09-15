# Find the Shortest Superstring II

## Description

You are given two strings, s1 and s2. Return the shortest possible string
that contains both s1 and s2 as substrings. If there are multiple valid
answers, return any one of them.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: s1 = "aba", s2 = "bab"
Output: "abab"
Explanation: "abab" is the shortest string that contains both "aba" and
"bab" as substrings.
```

### Example 2

```text
Input: s1 = "aa", s2 = "aaa"
Output: "aaa"
Explanation: "aa" is already contained within "aaa", so the shortest
superstring is "aaa".
```

### Constraints

- `1 <= s1.length <= 100`
- `1 <= s2.length <= 100`
- s1 and s2 consist of lowercase English letters only.

## Hints

### Hint 1

Check for the maximum suffix of one string that matches a prefix of the
other (in both directions) and merge accordingly.

# Shortest Common Supersequence

## Description

Given two strings `str1` and `str2`, return the shortest string that has both `str1`
and `str2` as subsequences. If there are multiple valid strings, return any of them.

A string `s` is a subsequence of string `t` if deleting some number of characters
from `t` (possibly `0`) results in the string `s`.

### Example 1

```text
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation:
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
```

### Example 2

```text
Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"
```

### Constraints

- `1 <= str1.length, str2.length <= 1000`
- `str1` and `str2` consist of lowercase English letters.

### Note

The test cases for this problem are constructed so that the shortest common
supersequence is unique, so the expected output is well-defined.

## Hints

### Hint 1

Use dynamic programming to find the length of the longest common subsequence of str1[i:] and str2[j:] for all pairs (i, j).

### Hint 2

The shortest common supersequence has length len(str1) + len(str2) - LCS(str1, str2).

### Hint 3

Recover the supersequence itself by walking through the DP table, taking shared characters when they match.

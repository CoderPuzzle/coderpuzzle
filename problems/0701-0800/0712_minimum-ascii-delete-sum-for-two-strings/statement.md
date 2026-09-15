# Minimum ASCII Delete Sum for Two Strings

## Description

Given two strings `s1` and `s2`, return the lowest ASCII sum of deleted
characters to make two strings equal.

### Example 1

```text
Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the
sum. Deleting "t" from "eat" adds 116 to the sum. At the end, both strings are
equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
```

### Example 2

```text
Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let", adds
100[d] + 101[e] + 101[e] to the sum. Deleting "e" from "leet" adds 101[e] to
the sum. At the end, both strings are equal to "let", and the answer is
100+101+101+101 = 403. If instead we turned both strings into "lee" or "eet",
we would get answers of 433 or 417, which are higher.
```

### Constraints

- `1 <= s1.length, s2.length <= 1000`
- `s1` and `s2` consist of lowercase English letters.

## Hints

### Hint 1

Let dp(i, j) be the answer for inputs s1[i:] and s2[j:].

### Hint 2

If s1[i] == s2[j], no deletion cost is charged for those characters: dp(i, j) = dp(i+1, j+1).

### Hint 3

Otherwise delete the cheaper of s1[i] or s2[j]: dp(i, j) = min(dp(i+1, j) + ord(s1[i]), dp(i, j+1) + ord(s2[j])).

### Hint 4

Base case: making a string equal to the empty string requires deleting all of its remaining characters, at their combined ASCII cost.

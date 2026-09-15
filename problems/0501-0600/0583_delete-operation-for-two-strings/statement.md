# Delete Operation for Two Strings

## Description

Given two strings `word1` and `word2`, return the minimum number of steps
required to make `word1` and `word2` the same.

In one step, you can delete exactly one character in either string.

### Example 1

```text
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
```

### Example 2

```text
Input: word1 = "leetcode", word2 = "etco"
Output: 4
```

### Constraints

- `1 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of only lowercase English letters.

## Hints

### Hint 1

The cheapest way to make the two words equal is to keep some common subsequence of both and delete everything else.

### Hint 2

The best subsequence to keep is the longest common subsequence (LCS) of word1 and word2.

### Hint 3

The answer is len(word1) + len(word2) - 2 * LCS(word1, word2); compute the LCS with classic two-dimensional dynamic programming.

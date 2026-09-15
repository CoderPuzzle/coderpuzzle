# Edit Distance

## Description

Given two strings `word1` and `word2`, return the minimum number of
operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:

- Insert a character
- Delete a character
- Replace a character

### Example 1

```text
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

### Example 2

```text
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

### Constraints

- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Hints

### Hint 1

Let dp[i][j] be the minimum number of operations to convert the first i characters of word1 into the first j characters of word2.

### Hint 2

When the current characters match, dp[i][j] = dp[i-1][j-1]; otherwise it is 1 + the cheapest of insert, delete, and replace.

### Hint 3

The base cases are converting a prefix into the empty string or vice versa — that costs exactly the remaining length.

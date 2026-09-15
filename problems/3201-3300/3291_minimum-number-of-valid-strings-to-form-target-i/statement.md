# Minimum Number of Valid Strings to Form Target I

## Description

You are given an array of strings `words` and a string `target`.

A string `x` is called valid if `x` is a prefix of any string in `words`.

Return the minimum number of valid strings that can be concatenated to form
`target`. If it is not possible to form `target`, return `-1`.

### Example 1

```text
Input: words = ["abc","aaaaa","bcdef"], target = "aabcdabc"
Output: 3
Explanation: The target string can be formed by concatenating:
- Prefix of length 2 of words[1], i.e. "aa".
- Prefix of length 3 of words[2], i.e. "bcd".
- Prefix of length 3 of words[0], i.e. "abc".
```

### Example 2

```text
Input: words = ["abababab","ab"], target = "ababaababa"
Output: 2
Explanation: The target string can be formed by concatenating:
- Prefix of length 5 of words[0], i.e. "ababa".
- Prefix of length 5 of words[0], i.e. "ababa".
```

### Example 3

```text
Input: words = ["abcdef"], target = "xyz"
Output: -1
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 5 * 10³`
- The input is generated such that `sum(words[i].length) <= 10⁵`.
- `words[i]` consists only of lowercase English letters.
- `1 <= target.length <= 5 * 10³`
- `target` consists only of lowercase English letters.

## Hints

### Hint 1

Let `dp[i]` be the minimum cost to form the prefix of length `i` of `target`.

### Hint 2

If `target[(i + 1)..j]` matches any prefix, update the range `dp[(i + 1)..j]`
to minimum between original value and `dp[i] + 1`.

### Hint 3

Use a Trie to check prefix matching.

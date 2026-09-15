# Smallest Subsequence Of Distinct Characters

## Description

Given a string `s`, return the lexicographically smallest subsequence of
`s` that contains all the distinct characters of `s` exactly once.

### Example 1

```text
Input: s = "bcabc"
Output: "abc"
```

### Example 2

```text
Input: s = "cbacdcbc"
Output: "acdb"
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Greedily try to add one missing character. How to check if adding some
character will not cause problems? Use bit-masks to check whether you
will be able to complete the subsequence if you add the character at
some index `i`.

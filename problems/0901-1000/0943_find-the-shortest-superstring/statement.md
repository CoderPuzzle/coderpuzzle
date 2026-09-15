# Find the Shortest Superstring

## Description

Given an array of strings `words`, return the smallest string that contains
each string in `words` as a substring. If there are multiple valid strings of
the smallest length, return any of them.

You may assume that no string in `words` is a substring of another string in
`words`.

### Example 1

```text
Input: words = ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
Explanation: All permutations of "alex","loves","leetcode" would also be
accepted.
```

### Example 2

```text
Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
Output: "gctaagttcatgcatc"
```

### Constraints

- `1 <= words.length <= 12`
- `1 <= words[i].length <= 20`
- `words[i]` consists of lowercase English letters.
- All the strings of `words` are unique.

## Hints

### Hint 1

For every ordered pair of words, precompute the maximum overlap between the suffix of one word and the prefix of the next.

### Hint 2

The shortest superstring corresponds to a Hamiltonian path over the words; use bitmask DP where dp[mask][i] is the shortest superstring covering the words in mask and ending with word i.

### Hint 3

Store the actual string (or parent pointers) for each state so the shortest final string can be reconstructed.

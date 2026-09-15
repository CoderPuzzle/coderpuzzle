# Palindrome Permutation II

## Description

Given a string `s`, return all the palindromic permutations (without
duplicates) of it.

For a deterministic answer, return the strings sorted in ascending
lexicographic order. If `s` has no palindromic permutation, return an empty
list.

### Example 1

```text
Input: s = "aabb"
Output: ["abba","baab"]
```

### Example 2

```text
Input: s = "abc"
Output: []
```

### Constraints

- `1 <= s.length <= 16`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

If a palindromic permutation exists, we just need to generate the first half
of the string.

### Hint 2

To generate all distinct permutations of a (half of a) string, use a similar
approach from: Permutations II or Next Permutation.

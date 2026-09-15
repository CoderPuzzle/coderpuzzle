# Palindrome Partitioning

## Description

Given a string `s`, partition `s` such that every substring of the
partition is a **palindrome**. Return _all possible palindrome partitioning
of_ `s`.

For a deterministic answer, list the partitions in the order produced by
backtracking that tries the first piece at increasing lengths: partitions
whose first piece is the single character `s[0]` come before partitions whose
first piece is `s[0..2)`, and so on recursively for the remaining suffix.

### Example 1

```text
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
```

### Example 2

```text
Input: s = "a"
Output: [["a"]]
```

### Constraints

- `1 <= s.length <= 16`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Backtrack: at each position try every prefix of the remaining suffix that is a palindrome, then recurse on the rest.

### Hint 2

Every single character is a palindrome, so the search always finds at least the all-single-character partition.

### Hint 3

Precompute an is-palindrome table (or check substrings on the fly) to avoid repeating the same test.

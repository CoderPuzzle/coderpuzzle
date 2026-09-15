# Lexicographically Smallest String After Reverse II

## Description

You are given a string `s` of length `n`, made of lowercase English letters.

You must apply exactly one operation. Pick an integer `k` with `1 <= k <= n`,
and then either reverse the first `k` characters of `s` or reverse the last
`k` characters of `s`.

Return the lexicographically smallest string obtainable after that single
operation.

### Example 1

```text
Input: s = "dcab"
Output: "acdb"
Explanation: With k = 3, reversing the first 3 characters turns "dca" into
"acd", so s becomes "acdb" — the smallest string reachable this way.
```

### Example 2

```text
Input: s = "abba"
Output: "aabb"
Explanation: With k = 3, reversing the last 3 characters turns "bba" into
"abb", so s becomes "aabb".
```

### Example 3

```text
Input: s = "zxy"
Output: "xzy"
Explanation: With k = 2, reversing the first 2 characters turns "zx" into
"xz", so s becomes "xzy".
```

### Constraints

- `1 <= n == s.length <= 10⁵`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Use binary search and hashing for faster lexicographic comparisons between candidate strings.

# Lexicographically Smallest String After Reverse

## Description

You are given a string `s` of length `n` consisting of lowercase English
letters.

You must perform exactly one operation: choose an integer `k` with
`1 <= k <= n`, and either reverse the first `k` characters of `s` or reverse
the last `k` characters of `s`.

Among all strings that one such operation can produce, return the
lexicographically smallest. The rule pins the answer down completely: every
choice of `k` together with a choice of end yields one candidate string, and
the answer is the minimum of those candidates under ordinary dictionary
order — no other outcome is allowed.

### Example 1

```text
Input: s = "dcab"
Output: "acdb"
Explanation: Choose k = 3 and reverse the first 3 characters. The prefix
"dca" becomes "acd", so s turns into "acdb", which is the lexicographically
smallest string achievable.
```

### Example 2

```text
Input: s = "abba"
Output: "aabb"
Explanation: Choose k = 3 and reverse the last 3 characters. The suffix
"bba" becomes "abb", so s turns into "aabb", which is the lexicographically
smallest string achievable.
```

### Example 3

```text
Input: s = "zxy"
Output: "xzy"
Explanation: Choose k = 2 and reverse the first 2 characters. The prefix
"zx" becomes "xz", so s turns into "xzy", which is the lexicographically
smallest string achievable.
```

### Constraints

- `1 <= n == s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Use brute force.

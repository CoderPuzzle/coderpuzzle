# Split a String Into the Max Number of Unique Substrings

## Description

Given a string `s`, return the maximum number of unique substrings that the
string can be split into.

You can split `s` into any list of non-empty substrings, as long as
concatenating them in order reproduces `s` exactly. However, every
substring in the split must be unique: no two pieces may be equal.

A substring is a contiguous run of characters within `s`.

### Example 1

```text
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ["a", "b", "ab", "c", "cc"].
Splitting like ["a", "b", "a", "b", "c", "cc"] is not valid, since "a" and
"b" would each appear more than once.
```

### Example 2

```text
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ["a", "ba"].
```

### Example 3

```text
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.
```

### Constraints

- `1 <= s.length <= 16`
- `s` consists of lowercase English letters only.

## Hints

### Hint 1

Use a set to keep track of which substrings have already been used.

### Hint 2

Try each possible substring at every position, and backtrack if a complete
split is not possible.

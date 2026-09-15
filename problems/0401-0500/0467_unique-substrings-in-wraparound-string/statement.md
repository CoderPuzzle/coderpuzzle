# Unique Substrings in Wraparound String

## Description

We define the string `base` to be the infinite wraparound string of
`"abcdefghijklmnopqrstuvwxyz"`, so `base` will look like this:

```text
"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...."
```

Given a string `s`, return the number of unique non-empty substrings of `s`
are present in `base`.

### Example 1

```text
Input: s = "a"
Output: 1
Explanation: Only the substring "a" of s is in base.
```

### Example 2

```text
Input: s = "cac"
Output: 2
Explanation: There are two substrings ("a", "c") of s in base.
```

### Example 3

```text
Input: s = "zab"
Output: 6
Explanation: There are six substrings ("z", "a", "b", "za", "ab", and
"zab") of s in base.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters.

# Longest Happy Prefix

## Description

A string is called a **happy prefix** if it is a non-empty prefix which is
also a suffix (excluding itself).

Given a string `s`, return the **longest happy prefix** of `s`. Return an
empty string `""` if no such prefix exists.

### Example 1

```text
Input: s = "level"
Output: "l"
Explanation: s contains 4 prefixes excluding itself ("l", "le", "lev", "leve") and suffixes ("l", "el", "vel", "evel"). The largest prefix which is also a suffix is given by "l".
```

### Example 2

```text
Input: s = "ababab"
Output: "abab"
Explanation: "abab" is the largest prefix which is also a suffix. They can overlap in the original string.
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

The longest happy prefix is exactly the longest proper prefix that is also a suffix, which the KMP prefix function computes.

### Hint 2

The answer has length pi[n - 1]; alternatively use the Z-algorithm or rolling hashes.

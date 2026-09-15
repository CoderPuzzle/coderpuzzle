# Count Substrings Starting and Ending with Given Character

## Description

You are given a string s and a character c. Return the total number of
substrings of s that start and end with c.

### Example 1

```text
Input: s = "abada", c = "a"
Output: 6
Explanation: Substrings starting and ending with "a" are: "abada", "abada",
"abada", "abada", "abada", "abada".
```

### Example 2

```text
Input: s = "zzz", c = "z"
Output: 6
Explanation: There are a total of 6 substrings in s and all start and end
with "z".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` and `c` consist only of lowercase English letters.

## Hints

### Hint 1

Count the number of characters 'c' in string s, let’s call it m.

### Hint 2

We can select 2 numbers i and j such that i are the start and end indices
of substring. Note that i and j can be the same.

### Hint 3

The answer is m \* (m + 1) / 2.

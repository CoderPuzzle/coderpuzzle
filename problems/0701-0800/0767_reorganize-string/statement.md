# Reorganize String

## Description

Given a string `s`, rearrange the characters of `s` so that any two
adjacent characters are not the same.

Return any possible rearrangement of `s` or return `""` if not possible.

If several rearrangements exist, the judge expects the canonical one produced
by placing the letters in order of decreasing frequency (ties broken
alphabetically) at the even indices `0, 2, 4, ...` first, then wrapping to the
odd indices `1, 3, 5, ...`.

### Example 1

```text
Input: s = "aab"
Output: "aba"
```

### Example 2

```text
Input: s = "aaab"
Output: ""
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Alternate placing the most common letters first so no two equal characters end up next to each other.

### Hint 2

Count every letter's frequency; a rearrangement exists only if no letter occurs more than (n + 1) // 2 times.

### Hint 3

Fill positions 0, 2, 4, ... with the most frequent letter, continue with the next letters, then wrap around to positions 1, 3, 5, ...

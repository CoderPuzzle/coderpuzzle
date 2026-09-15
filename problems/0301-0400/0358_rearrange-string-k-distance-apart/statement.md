# Rearrange String k Distance Apart

## Description

Given a string `s` and an integer `k`, rearrange `s` such that the same
characters are at least distance `k` from each other. If it is not possible
to rearrange the string, return an empty string `""`.

The original problem accepts any valid rearrangement; this judge compares
strings exactly, so the output is pinned to one canonical arrangement. When
`k <= 1`, return `s` unchanged. Otherwise count the letters, then emit passes
until none remain: each pass appends up to `k` distinct letters — those with
the largest remaining counts, ties broken by the smaller letter — in that
order, and decrements each appended letter's count by one. If a pass can
append fewer than `k` letters while letters would remain after it, no
rearrangement exists: return `""`.

### Example 1

```text
Input: s = "aabbcc", k = 3
Output: "abcabc"
Explanation: The same letters are at least a distance of 3 from each other.
```

### Example 2

```text
Input: s = "aaabc", k = 3
Output: ""
Explanation: It is not possible to rearrange the string.
```

### Example 3

```text
Input: s = "aaadbbcc", k = 2
Output: "abacabcd"
Explanation: The same letters are at least a distance of 2 from each other.
```

### Constraints

- `1 <= s.length <= 3 * 10⁵`
- `s` consists of only lowercase English letters.
- `0 <= k <= s.length`

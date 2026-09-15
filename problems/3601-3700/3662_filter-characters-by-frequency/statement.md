# Filter Characters by Frequency

## Description

You are given a string `s` of lowercase English letters and an integer `k`.

Build a new string from `s` by keeping every occurrence of each character
whose total count across all of `s` is strictly less than `k`, and dropping
every occurrence of a character that appears `k` or more times. Kept
characters stay in their original relative order — the result is what
remains after the frequent characters are removed in place, never a
rearrangement of them.

Return the resulting string. If no character qualifies, return the empty
string.

### Example 1

```text
Input: s = "aadbbcccca", k = 3
Output: "dbb"
Explanation: The counts are 'a' = 3, 'd' = 1, 'b' = 2 and 'c' = 4. Only 'd'
and 'b' occur fewer than 3 times, so removing every other occurrence in
place leaves "dbb".
```

### Example 2

```text
Input: s = "xyz", k = 2
Output: "xyz"
Explanation: Each of 'x', 'y' and 'z' occurs exactly once, which is fewer
than 2, so the whole string survives.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `1 <= k <= s.length`

## Hints

### Hint 1

Count the frequency of each character using a 26-entry array or a frequency
map, then iterate through the string and append each character whose
frequency is less than `k` to the result.

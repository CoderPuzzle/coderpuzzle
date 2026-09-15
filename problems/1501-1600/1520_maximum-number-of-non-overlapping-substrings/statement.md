# Maximum Number of Non-Overlapping Substrings

## Description

Given a string `s` of lowercase letters, find the maximum number of
non-empty substrings of `s` that meet both of the following conditions:

- The substrings do not overlap: for any two chosen substrings `s[i..j]`
  and `s[x..y]`, either `j < x` or `i > y` holds.
- A substring that contains some character `c` must also contain every
  other occurrence of `c` in `s`.

Return substrings meeting the above conditions. If multiple sets achieve
the same maximum count, return the set with the smallest total length; it
can be shown that such a set is unique. You may return the substrings in
any order.

### Example 1

```text
Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: The valid substrings that satisfy the containment rule are:
[
  "adefaddaccc",
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
Choosing "adefaddaccc" leaves nothing else to choose, for a total of 1.
Choosing "adefadda" leaves only "ccc" available, for a total of 2.
Choosing "ef" is possible but suboptimal, since it can be split into "e"
and "f" without losing containment. Splitting it that way gives
["e", "f", "ccc"], a total of 3 substrings, which is optimal. No other
set of 3 substrings achieves a smaller total length.
```

### Example 2

```text
Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation: The set ["d","abba","cc"] also has 3 substrings, but it is
not the answer because its total length (1 + 4 + 2 = 7) is larger than
["d","bb","cc"]'s total length (1 + 2 + 2 = 5).
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Two valid substrings can never partially overlap: one must be either
disjoint from or entirely inside the other.

### Hint 2

For each character, compute the index of its first and last occurrence
in `s`.

### Hint 3

Starting from a character's `[first, last]` range, expand the range
whenever it contains another character whose own first or last occurrence
falls outside it, and repeat until the range stops growing.

### Hint 4

Sort the valid substrings by length and greedily keep the shortest ones
first, discarding any candidate that overlaps one already kept.

# Rearrange String to Avoid Character Pair

## Description

You are given a string `s` and two distinct lowercase English letters `x` and `y`.

Rearrange the characters of `s` to construct a new string `t` such that:

- `t` is a permutation of `s`.
- Every occurrence of `y` appears before every occurrence of `x` in `t`.

Return any valid string `t`.

### Example 1

```text
Input: s = "aabc", x = "a", y = "c"
Output: "cbaa"
Explanation: The string "cbaa" is a permutation of "aabc", and every occurrence of 'c' appears before every occurrence of 'a'.
```

### Example 2

```text
Input: s = "dcab", x = "d", y = "b"
Output: "cabd"
Explanation: The string "cabd" is a permutation of "dcab", and every occurrence of 'b' appears before every occurrence of 'd'.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of lowercase English letters.
- `x` and `y` are lowercase English letters.
- `x != y`

## Hints

### Hint 1

Only the relative order between occurrences of `x` and `y` matters.

### Hint 2

One approach is to place all occurrences of `y` before all other characters, and place all occurrences of `x` after them.

### Hint 3

Another approach is to sort the characters of `s`. If `x < y`, sort in descending order; otherwise, sort in ascending order.

After sorting this way, every occurrence of `y` will appear before every occurrence of `x`.

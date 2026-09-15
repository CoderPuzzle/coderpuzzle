# Process String with Special Operations II

## Description

You are given a string `s` consisting of lowercase English letters and the
special characters: `*`, `#`, and `%`.

You are also given an integer `k`.

Build a new string `result` by processing `s` according to the following
rules from left to right:

- If the letter is a lowercase English letter append it to `result`.
- A `*` removes the last character from `result`, if it exists.
- A `#` duplicates the current `result` and appends it to itself.
- A `%` reverses the current `result`.

Return the kth character of the final string `result`. If `k` is out of the
bounds of `result`, return `'.'`.

### Example 1

```text
Input: s = "a#b%*", k = 1
Output: "a"
Explanation: 'a' appends to give "a", '#' duplicates it to "aa", 'b'
appends to make "aab", '%' reverses it to "baa", and '*' removes the
last character, leaving "ba". The character at index k = 1 of "ba" is 'a'.
```

### Example 2

```text
Input: s = "cd%#*#", k = 3
Output: "d"
Explanation: 'c' and 'd' append to make "cd", '%' reverses it to "dc",
'#' duplicates it to "dcdc", '*' removes the last character to give
"dcd", and '#' duplicates it to "dcddcd". The character at index k = 3
of "dcddcd" is 'd'.
```

### Example 3

```text
Input: s = "z*#", k = 0
Output: "."
Explanation: 'z' appends, '*' removes it, and '#' duplicates the empty
string, leaving "". Since index k = 0 is out of bounds, the output is '.'.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of only lowercase English letters and special characters
  `*`, `#`, and `%`.
- `0 <= k <= 10¹⁵`
- The length of `result` after processing `s` will not exceed `10¹⁵`.

## Hints

### Hint 1

Track the length of the string after each operation on `s`.

### Hint 2

Walk backwards through `s`, undoing each `#` by using modulus on the tracked
lengths, and undoing each `%` by mirroring across the midpoint, to pinpoint
the `k`th character.

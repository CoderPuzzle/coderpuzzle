# Process String with Special Operations I

## Description

You are given a string s consisting of lowercase English letters and the
special characters: *, #, and %.

Build a new string result by processing s according to the following rules
from left to right:

- If the letter is a lowercase English letter append it to result.
- A `*` removes the last character from result, if it exists.
- A `#` duplicates the current result and appends it to itself.
- A `%` reverses the current result.

Return the final string result after processing all characters in s.

### Example 1

```text
Input: s = "a#b%*"
Output: "ba"
Explanation: 'a' appends it, '#' duplicates it to "aa", 'b' appends to
make "aab", '%' reverses it to "baa", and '*' removes the last
character, leaving "ba".
```

### Example 2

```text
Input: s = "z*#"
Output: ""
Explanation: 'z' appends it, '*' removes it, and '#' duplicates the
empty string, leaving "".
```

### Constraints

- `1 <= s.length <= 20`
- `s` consists of only lowercase English letters and special characters
  `*`, `#`, and `%`.

## Hints

### Hint 1

Simulate as described

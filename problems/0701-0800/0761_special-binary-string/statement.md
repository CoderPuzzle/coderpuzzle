# Special Binary String

## Description

Special binary strings are binary strings with the following two properties:

- The number of `0`'s is equal to the number of `1`'s.
- Every prefix of the binary string has at least as many `1`'s as `0`'s.

You are given a special binary string `s`.

A move consists of choosing two consecutive, non-empty, special substrings
of `s`, and swapping them. Two strings are consecutive if the last character
of the first string is exactly one index before the first character of the
second string.

Return the lexicographically largest resulting string possible after
applying the mentioned operations on the string.

### Example 1

```text
Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" (occurring at s[1]) and "1100" (at s[3]) are
swapped.
This is the lexicographically largest string possible after some number of
swaps.
```

### Example 2

```text
Input: s = "10"
Output: "10"
```

### Constraints

- `1 <= s.length <= 50`
- `s[i]` is either `'0'` or `'1'`.
- `s` is a special binary string.

## Hints

### Hint 1

Draw a line from `(x, y)` to `(x+1, y+1)` on a `1` and to `(x+1, y-1)` on a
`0`. A special substring is a line that starts and ends at the same
y-coordinate, and that is the lowest y-coordinate it reaches. Call a
mountain a special substring with no special prefixes — only at the
beginning and the end does it touch that lowest line. If `F` is the answer
function and `S` has mountain decomposition `M1, M2, M3, ..., Mk`, then the
answer is `reverse_sorted(F(M1), F(M2), ..., F(Mk))`. However, you will
also need to deal with the case that `S` is itself a mountain, such as
`"11011000"` becoming `"11100100"`.

# Replace the Substring for Balanced String

## Description

You are given a string `s` of length `n` containing only four kinds of
characters: `'Q'`, `'W'`, `'E'`, and `'R'`.

A string is said to be **balanced** if each of its characters appears
`n / 4` times where `n` is the length of the string.

Return the minimum length of the substring that can be replaced with any other
string of the same length to make `s` balanced. If `s` is already balanced,
return 0.

### Example 1

```text
Input: s = "QWER"
Output: 0
Explanation: s is already balanced.
```

### Example 2

```text
Input: s = "QQWE"
Output: 1
Explanation: We need to replace a 'Q' to 'R', so that "RQWE" (or "QRWE") is balanced.
```

### Example 3

```text
Input: s = "QQQW"
Output: 2
Explanation: We can replace the first "QQ" to "ER".
```

### Constraints

- `n == s.length`
- `4 <= n <= 10⁵`
- `n` is a multiple of 4.
- `s` contains only `'Q'`, `'W'`, `'E'`, and `'R'`.

## Hints

### Hint 1

Use 2-pointers algorithm to make sure all amount of characters outside the 2
pointers are smaller or equal to `n/4`.

### Hint 2

That means you need to count the amount of each letter and make sure the
amount is enough.

# Maximum Nesting Depth of the Parentheses

## Description

You are given a valid parentheses string `s` (a VPS). `s` may also contain
digits and the arithmetic operators `+`, `-`, `*`, and `/`; only the
parenthesis characters affect nesting.

Return the nesting depth of `s` — the maximum number of parentheses that
are open at the same time as you scan `s` from left to right.

### Example 1

```text
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Digit 8 is inside 3 nested parentheses in the string.
```

### Example 2

```text
Input: s = "(1)+((2))+(((3)))"
Output: 3
Explanation: Digit 3 is inside 3 nested parentheses in the string.
```

### Example 3

```text
Input: s = "()(())((()()))"
Output: 3
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of digits `0-9` and the characters `+`, `-`, `*`, `/`, `(`,
  and `)`.
- It is guaranteed that `s` is a valid parentheses string (VPS).

## Hints

### Hint 1

The depth of any character in `s` equals the number of `(` seen so far
minus the number of `)` seen so far.

# Minimum Add to Make Parentheses Valid

## Description

A parentheses string is valid if and only if one of the following is true:

- It is the empty string.
- It can be written as `AB` (A concatenated with B), where `A` and `B` are
  valid parentheses strings.
- It can be written as `(A)`, where `A` is a valid parentheses string.

You are given a parentheses string `s`. In one move, you can insert a
parenthesis at any position of the string.

For example, if `s = "()))"`, you can insert an opening parenthesis to get
`"(()))"` or a closing parenthesis to get `"())))"`.

Return the minimum number of moves required to make `s` valid.

### Example 1

```text
Input: s = "())"
Output: 1
```

### Example 2

```text
Input: s = "((("
Output: 3
```

### Constraints

- `1 <= s.length <= 1000`
- `s[i]` is either `'('` or `')'`.

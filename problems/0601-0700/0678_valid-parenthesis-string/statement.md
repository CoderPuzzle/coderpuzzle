# Valid Parenthesis String

## Description

Given a string `s` containing only three types of characters: `'('`, `')'` and
`'*'`, return `true` if `s` is valid.

The following rules define a valid string:

- Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
- Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
- Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
- `'*'` could be treated as a single right parenthesis `')'` or a single left
  parenthesis `'('` or an empty string `""`.

### Example 1

```text
Input: s = "()"
Output: true
```

### Example 2

```text
Input: s = "(*)"
Output: true
```

### Example 3

```text
Input: s = "(*))"
Output: true
```

### Constraints

- `1 <= s.length <= 100`
- `s[i]` is `'('`, `')'` or `'*'`.

## Hints

### Hint 1

Use backtracking to explore all possible combinations of treating `'*'` as
either `'('`, `')'`, or an empty string. If any combination leads to a valid
string, return true.

### Hint 2

DP[i][j] represents whether the substring s[i:j] is valid.

### Hint 3

Keep track of the count of open parentheses encountered so far. If you
encounter a close parenthesis, it should balance with an open parenthesis.
Utilize a stack to handle this effectively.

### Hint 4

How about using 2 stacks instead of 1? Think about it.

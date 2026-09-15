# Minimum Remove to Make Valid Parentheses

## Description

Given a string `s` of `'('`, `')'` and lowercase English characters.

Your task is to remove the minimum number of parentheses ( `'('` or `')'`, in
any positions ) so that the resulting parentheses string is valid and return
that valid string.

This problem fixes the canonical answer: remove exactly the unmatched
parentheses — every `')'` that has no available `'('` before it, and every
`'('` that has no matching `')'` after it — keeping every other character in
place.

Formally, a parentheses string is valid if and only if:

- It is the empty string, contains only lowercase characters, or
- It can be written as `AB` (A concatenated with B), where A and B are valid
  strings, or
- It can be written as `(A)`, where A is a valid string.

### Example 1

```text
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: The final ')' is unmatched, so it is the one removed.
```

### Example 2

```text
Input: s = "a)b(c)d"
Output: "ab(c)d"
Explanation: The ')' before 'b' has no '(' before it, so it is removed.
```

### Example 3

```text
Input: s = "))(("
Output: ""
Explanation: Every parenthesis is unmatched, so all are removed. An empty string is also valid.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is either `'('`, `')'`, or a lowercase English letter.

## Hints

### Hint 1

Each prefix of a balanced parentheses string has a number of open parentheses
greater than or equal to the number of closed ones — and the mirror property
holds for each suffix.

### Hint 2

Check the array from left to right, removing characters that do not meet the
property mentioned above; then do the same backwards.

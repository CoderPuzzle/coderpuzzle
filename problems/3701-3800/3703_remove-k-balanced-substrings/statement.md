# Remove K-Balanced Substrings

## Description

You are given a string s consisting only of the characters '(' and ')', and
an integer k.

A string is k-balanced when it consists of exactly k consecutive '('
characters followed by exactly k consecutive ')' characters — for instance,
when k = 3 the string "((()))" is 3-balanced.

Apply the following pass repeatedly: remove all non-overlapping k-balanced
substrings from the current string, then join the remaining pieces together.
Keep passing until no k-balanced substring exists anywhere, and return the
final string.

### Example 1

```text
Input: s = "(())", k = 1
Output: ""
Explanation: The 1-balanced substring is "()". Pass 1 removes the inner "()"
from "(())", and the outer halves join back into "()"; pass 2 removes that
pair too, leaving the empty string.
```

### Example 2

```text
Input: s = "(()(", k = 1
Output: "(("
Explanation: Pass 1 removes the "()" formed by the second '(' and the ')',
and the remaining pieces join into "((", which holds no 1-balanced substring,
so the process stops.
```

### Example 3

```text
Input: s = "((()))()()()", k = 3
Output: "()()()"
Explanation: The only 3-balanced substring is the leading "((()))", which
pass 1 removes. What remains, "()()()", has no run of three consecutive '('
characters and therefore no 3-balanced substring, so the process stops.
```

### Constraints

- `2 <= s.length <= 10⁵`
- `s` consists only of `'('` and `')'`.
- `1 <= k <= s.length / 2`

## Hints

### Hint 1

Use a stack.

### Hint 2

Try run-length encoding; operations only happen at boundaries of '(' and ')'
runs.

### Hint 3

When adjacent runs are '(' then ')', you can cancel in blocks of k.

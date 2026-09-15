# Longest Valid Parentheses

## Description

Given a string containing just the characters `'('` and `')'`, return the
length of the longest valid (well-formed) parentheses substring.

### Example 1

```text
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

### Example 2

```text
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```

### Example 3

```text
Input: s = ""
Output: 0
```

### Constraints

- `0 <= s.length <= 3 * 10^4`
- `s[i]` is `'('`, or `')'`.

## Hints

### Hint 1

Keep a stack of indices, seeded with -1 as the base of the current valid stretch.

### Hint 2

Push the index of every '(' ; on ')' pop, and if the stack empties push the index as the new base, otherwise the valid stretch ending here starts just after the new stack top.

### Hint 3

The answer is the maximum i - stack.top() seen over all closing brackets.

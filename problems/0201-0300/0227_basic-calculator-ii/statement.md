# Basic Calculator II

## Description

Given a string `s` which represents an expression, evaluate this expression and
return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate
results will be in the range `[-2³¹, 2³¹ - 1]`.

Note: You are not allowed to use any built-in function which evaluates strings
as mathematical expressions, such as `eval()`.

### Example 1

```text
Input: s = "3+2*2"
Output: 7
Explanation: Multiplication binds tighter than addition, so 3 + 2 * 2 = 3 + 4 = 7.
```

### Example 2

```text
Input: s = " 3/2 "
Output: 1
Explanation: Integer division truncates toward zero, so 3 / 2 = 1. Leading and trailing spaces are ignored.
```

### Example 3

```text
Input: s = " 3+5 / 2 "
Output: 5
Explanation: 5 / 2 truncates to 2, so 3 + 5 / 2 = 3 + 2 = 5.
```

### Constraints

- `1 <= s.length <= 3 * 10⁵`
- `s` consists of integers and operators (`'+'`, `'-'`, `'*'`, `'/'`) separated by some number of spaces.
- `s` represents a valid expression.
- All the integers in the expression are non-negative integers in the range `[0, 2³¹ - 1]`.
- The answer is guaranteed to fit in a 32-bit integer.

### Follow-up

Can you evaluate the expression in a single left-to-right pass with O(n) extra
space — and, with a little more care, O(1) extra space?

## Hints

### Hint 1

Multiplication and division bind tighter than addition and subtraction, so the
final answer is a plain sum of terms. Scan left to right and defer the additions
while you still might run into a `*` or `/`.

### Hint 2

Keep a stack of terms. When you finish reading a number, apply the operator
that preceded it: `+` pushes the number, `-` pushes its negation, and `*` or
`/` combines the number with the term on top of the stack immediately.

### Hint 3

Division truncates toward zero, and the term on top of the stack can be
negative — for an input like `5-3/2` the division is really `-3 / 2 = -1`, so
floor division would give the wrong answer.

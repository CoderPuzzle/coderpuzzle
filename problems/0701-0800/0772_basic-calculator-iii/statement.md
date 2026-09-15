# Basic Calculator III

## Description

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, the operators
`'+'`, `'-'`, `'*'`, `'/'`, and open `'('` and closing `')'` parentheses.
The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate
results will be in the range `[-2³¹, 2³¹ - 1]`.

Note: You are not allowed to use any built-in function which evaluates strings
as mathematical expressions, such as `eval()`.

### Example 1

```text
Input: s = "1+1"
Output: 2
Explanation: A single addition: 1 + 1 = 2.
```

### Example 2

```text
Input: s = "6-4/2"
Output: 4
Explanation: Division binds tighter than subtraction: 4 / 2 = 2, so 6 - 2 = 4.
```

### Example 3

```text
Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21
Explanation: The parenthesized parts evaluate first: 5 + 5 * 2 = 15 and
6 / 2 + 8 = 11, so the whole expression is 2 * 15 / 3 + 11 = 10 + 11 = 21.
```

### Constraints

- `1 <= s.length <= 10⁴`
- `s` consists of digits, `'+'`, `'-'`, `'*'`, `'/'`, `'('`, and `')'`.
- `s` represents a valid expression.
- Every number in `s` is a non-negative integer; there is no unary minus.
- All intermediate results are in the range `[-2³¹, 2³¹ - 1]`.

### Follow-up

Recursive descent handles the nesting with the call stack. Can you rewrite it
with explicit stacks so that deeply nested parentheses cost heap memory instead
of stack frames, in a single left-to-right pass?

## Hints

### Hint 1

Read the expression as a tiny grammar: an expression is a sum/difference of
terms, a term is a product/quotient of factors, and a factor is either a
number or a parenthesized expression. Three mutually recursive functions over
one shared cursor give you precedence and parentheses for free.

### Hint 2

Each parsing level only needs to know where to stop: a term stops at `'+'`,
`'-'`, `')'`, or the end of the string, while an expression stops at `')'` or
the end. Whoever consumes a token advances the cursor, and the caller resumes
exactly where the callee stopped — that is how a `')'` hands control back to
the enclosing factor.

### Hint 3

Division truncates toward zero, and either operand can be negative because a
parenthesized subexpression can evaluate to a negative value — `(2-8)/3` is
`-2`, not `-3`. Floor division gives the wrong answer here.

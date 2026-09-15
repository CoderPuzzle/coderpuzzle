# Least Operators to Express Number

## Description

Given a single positive integer `x`, write an expression of the form
`x (op1) x (op2) x (op3) x ...`, where every operator is addition, subtraction,
multiplication, or division (`+`, `-`, `*`, `/`). For example, with `x = 3`, the
expression `3 * 3 / 3 + 3 - 3` has the value `3`.

The following conventions apply:

- The division operator `/` returns rational numbers.
- There are no parentheses placed anywhere.
- Multiplication and division happen before addition and subtraction, as in the
  usual order of operations.
- The unary negation operator is not allowed: `x - x` is a valid expression
  because it only uses subtraction, but `-x + x` is not, because it uses
  negation.

Write an expression that equals the given `target` and uses the least number of
operators, and return that least number of operators.

### Example 1

```text
Input: x = 3, target = 19
Output: 5
Explanation: 3 * 3 + 3 * 3 + 3 / 3 equals 19 and contains 5 operators.
```

### Example 2

```text
Input: x = 5, target = 501
Output: 8
Explanation: 5 * 5 * 5 * 5 - 5 * 5 * 5 + 5 / 5 equals 501 and contains 8 operators.
```

### Example 3

```text
Input: x = 100, target = 100000000
Output: 3
Explanation: 100 * 100 * 100 * 100 equals 100000000 and contains 3 operators.
```

### Constraints

- `2 <= x <= 100`
- `1 <= target <= 2 * 10⁸`

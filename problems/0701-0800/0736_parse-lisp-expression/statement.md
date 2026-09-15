# Parse Lisp Expression

## Description

You are given a string `expression` representing a Lisp-like expression.
Return the integer value of the expression.

The syntax for these expressions is given as follows:

- An expression is either an integer, a `let` expression, an `add` expression,
  a `mult` expression, or an assigned variable. Expressions always evaluate to
  a single integer (an integer could be positive or negative).
- A `let` expression takes the form `(let v1 e1 v2 e2 ... vn en expr)`, where
  `let` is always the string "let", then there are one or more pairs of
  alternating variables and expressions: the first variable `v1` is assigned
  the value of the expression `e1`, the second variable `v2` is assigned the
  value of the expression `e2`, and so on sequentially; the value of this
  `let` expression is the value of the expression `expr`.
- An `add` expression takes the form `(add e1 e2)` where `add` is always the
  string "add"; there are always two expressions `e1`, `e2`, and the result is
  the addition of the evaluation of `e1` and the evaluation of `e2`.
- A `mult` expression takes the form `(mult e1 e2)` where `mult` is always the
  string "mult"; there are always two expressions `e1`, `e2`, and the result is
  the multiplication of the evaluation of `e1` and the evaluation of `e2`.
- For this question, we use a smaller subset of variable names: a variable
  starts with a lowercase letter, then zero or more lowercase letters or
  digits. Additionally, the names "add", "let", and "mult" are protected and
  will never be used as variable names.
- Finally, there is the concept of scope. When an expression of a variable name
  is evaluated, within the context of that evaluation, the innermost scope (in
  terms of parentheses) is checked first for the value of that variable, and
  then outer scopes are checked sequentially. It is guaranteed that every
  expression is legal.

### Example 1

```text
Input: expression = "(let x 2 (mult x (let x 3 y 4 (add x y))))"
Output: 14
Explanation: In the expression (add x y), when checking for the value of the variable x,
we check from the innermost scope to the outermost in the context of the variable we are
trying to evaluate. Since x = 3 is found first, the value of x is 3.
```

### Example 2

```text
Input: expression = "(let x 3 x 2 x)"
Output: 2
Explanation: Assignment in let statements is processed sequentially.
```

### Example 3

```text
Input: expression = "(let x 1 y 2 x (add x y) (add x y))"
Output: 5
Explanation: The first (add x y) evaluates as 3, and is assigned to x.
The second (add x y) evaluates as 3 + 2 = 5.
```

### Constraints

- `1 <= expression.length <= 2000`
- There are no leading or trailing spaces in `expression`.
- All tokens are separated by a single space in `expression`.
- The answer and all intermediate calculations of that answer are guaranteed
  to fit in a 32-bit integer.
- The expression is guaranteed to be legal and evaluate to an integer.

## Hints

### Hint 1

If the expression starts with a digit or '-', it is an integer; if it starts with a lowercase letter, it is a variable to look up in the innermost scope that defines it.

### Hint 2

Group the tokens of a parenthesized expression by counting the balance of '(' minus ')': a token ends when the balance returns to zero, e.g. (add 1 (add 2 3)) has the tokens '1' and '(add 2 3)'.

### Hint 3

For add and mult expressions, evaluate both sub-expressions and combine their values.

### Hint 4

For let expressions, evaluate and assign each variable/expression pair sequentially in a scope layered over the outer one, then return the evaluation of the final expression in that scope.

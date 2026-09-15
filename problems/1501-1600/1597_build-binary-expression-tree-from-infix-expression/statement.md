# Build Binary Expression Tree From Infix Expression

## Description

A binary expression tree represents an arithmetic expression: every leaf
holds an operand (a digit), and every internal node holds one of the
operators `+`, `-`, `*`, `/` and has exactly two children — its left
subtree is the operator's left operand, its right subtree the right
operand.

You are given a string `s`, an infix expression built from single-digit
operands, the operators above, and (possibly) the parentheses `(` and
`)`. Order of operations applies: parenthesized sub-expressions evaluate
first, multiplication and division happen before addition and
subtraction, and operators of equal precedence apply left to right.
Division truncates toward zero (so `7 / 2` is `3` and `-7 / 2` is `-3`).

Adapted return contract: the original problem asks for the constructed
tree itself — any tree whose in-order traversal reproduces `s` and whose
structure honors precedence, since this judge's typed-value vocabulary
has no way to check a hand-designed tree/node class as a return value,
only plain values. `buildAndEvaluate` instead returns the single integer
that evaluating such a tree produces: parse `s` into a binary expression
tree that follows the precedence rules above (or evaluate it by any
method that respects the same precedence — building an explicit tree
object is an implementation detail, not part of the contract), then
report its value.

### Example 1

![diagram](figures/1597-1.svg)

```text
Input: s = "3*4-2*5"
Output: 2
Explanation: 3*4 is 12 and 2*5 is 10, so the expression is 12-10 = 2.
```

### Example 2

![diagram](figures/1597-2.svg)

![diagram](figures/1597-3.svg)

![diagram](figures/1597-4.svg)

```text
Input: s = "2-3/(5*2)+1"
Output: 3
Explanation: The parenthesized 5*2 is 10, then 3/10 truncates to 0, so
the expression is 2-0+1 = 3.
```

### Example 3

```text
Input: s = "9-2-3"
Output: 4
Explanation: Same-precedence operators apply left to right: (9-2)-3 is
4, not 9-(2-3).
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of the digits `0`-`9` and the characters `(`, `)`, `+`,
  `-`, `*`, and `/`.
- Every operand in `s` is exactly one digit.
- `s` is guaranteed to represent a valid expression.
- Division truncates toward zero.
- `s` never divides by zero.
- Every intermediate value produced while evaluating `s`, and the final
  result, fits in a signed 64-bit integer.

## Hints

### Hint 1

Convert the infix expression to postfix (or parse it directly with
recursive descent, one production per precedence level).

### Hint 2

Build an expression tree from the postfix form, then evaluate it — or
fold the two steps together and evaluate while you parse.

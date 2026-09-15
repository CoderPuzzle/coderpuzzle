# Solutions — Design an Expression Tree With Evaluate Function

## Operand-Stack Postfix Evaluation

`postfix` is already in Reverse Polish form, so it can be evaluated in one
left-to-right pass with a single stack of operand values: push each
numeric token as it is read, and on an operator token pop the top two
values (the right operand comes off first, since it was pushed last), apply
the operator, and push the result back. Because every prefix of a valid
postfix expression leaves the stack holding exactly the pending
sub-results still needed higher up, this never underflows, and after the
final token the stack holds exactly one value — the answer.

This is the original design exercise's `Node.evaluate()` collapsed into a
single loop: each pop-apply-push step computes exactly the value an
internal `OperatorNode` would return from evaluating its two children,
and each pushed operand is exactly what a leaf `NumericNode` would
return. Building explicit tree objects only to immediately recurse over
them once is unnecessary work once the goal is the evaluated integer
rather than the tree itself, so the stack folds tree construction and
evaluation into the same pass. Division truncates toward zero, matching
integer division's default behavior in every target language for this
judge.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is `postfix.length`
(the stack holds at most `O(n)` operands at any point).

# Solutions — Basic Calculator II

## Stack of Signed Terms

Multiplication and division bind tighter than addition and subtraction, so the expression is really a plain sum of terms, where each term is a maximal chain of `*` and `/` operations. The trick is to defer the additions: scan left to right building the current number, and when an operator (or the end of the string) is reached, apply the operator that _preceded_ the number. A stack collects the fully evaluated terms; the answer is the sum of the stack.

The pending operator decides what to do with the number just read: `+` pushes the number, `-` pushes its negation, while `*` and `/` combine the number with the term currently on top of the stack (`stack.pop() * num` or the divided equivalent) and push the result back. The flush condition uses two separate `if` checks — a digit in the last position must both extend `num` and trigger the final flush, so `elif` would silently drop the last term.

Division must truncate toward zero, and Python's `//` floors instead, which matters because the term on top of the stack can be negative (for `5-3/2` the term is `-3` and the result must be `-1`, not `-2`). The code divides absolute values and reattaches the sign of the previous term. Each character is processed once with constant-time stack work per number; the stack can hold up to one entry per additive term.

**Complexity:** `O(n)` time, `O(n)` space.

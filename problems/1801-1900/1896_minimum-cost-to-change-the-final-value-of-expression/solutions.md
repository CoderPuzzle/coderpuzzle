# Solutions — Minimum Cost to Change the Final Value of Expression

## Stack evaluation with flip costs

Every subexpression is summarized by a pair `(v, c)`: its current value `v` and the minimum number of operations `c` needed to flip that value. A literal digit starts as `(bit, 1)` since changing a digit is one operation. When two operands meet an operator, the pair's value is the plain AND/OR, and the flip cost is worked out case by case, exploiting that operations are of two independent kinds — flip an operand (paying its flip cost) or swap the operator (paying 1).

For AND evaluating to 1 (`1 & 1`), flipping either operand to 0 suffices, so the cost is `min(ca, cb)`. For AND evaluating to 0, the cheapest escape depends on the operands: with both operands 0 you must also swap `&` for `|` to let a single flipped 1 shine through, costing `1 + min(ca, cb)`; with exactly one operand 0 you can either flip that zero (its flip cost) or just swap the operator for 1 — take the smaller. OR is the perfect mirror: `0 | 0` flips one operand up to 1 for `min(ca, cb)`; `0 | 1` and `1 | 0` cost the 1-operand's flip cost or one operator swap; `1 | 1` needs both gone, achieved by swapping to `&` and flipping one operand, `1 + min(ca, cb)`. In every case the alternatives are "make the current value change by the cheapest local edit", and the recurrence takes the minimum.

Parentheses are handled with a stack holding both operators and operand pairs. On `)`, everything back to the matching `(` is popped, the collected values and operators are reversed back into left-to-right order, and the sequence is reduced step by step — no precedence, matching the problem's left-to-right rule. Whatever remains at the top level is reduced the same way at the end, and the second component of the final pair is the answer. Each character is pushed and popped at most once.

**Complexity:** `O(n)` time, `O(n)` space.

# Solutions — Basic Calculator

## Sign-Tracking Stack

The expression contains only additions, subtractions, and parenthesized groups, so the whole problem reduces to summing signed terms. Scan the string once while carrying three pieces of state: the running `result` of the current (sub)expression, the pending `sign` for the next term, and the multi-digit `num` currently being assembled. Digits extend `num` via `num = num * 10 + digit`; an operator folds the finished number in as `result += sign * num` and then records the sign for the term that follows.

Parentheses are handled by saving and restoring context with a stack. On `(` the code pushes the current `result` and `sign` and restarts both (`result = 0`, `sign = 1`) so the inner group is evaluated as a fresh expression. On `)` the inner `num` is folded in, then the inner value is combined with the saved context in one step: the popped sign is applied to the inner result and the popped outer result is added back. Since the sign was pushed last, `stack.pop()` retrieves it first.

Stepping the statement's Example 3, `(1+(4+5+2)-3)+(6+8)`, through the scan:

1. The leading `(` pushes the outer context `(0, 1)` and restarts; `stack = [0, 1]`.
2. The inner `(` before `4+5+2` pushes `(1, 1)`; `stack = [0, 1, 1, 1]`.
3. Its matching `)` folds the inner sum to 11, then combines: `11 × 1 + 1 = 12`; `stack = [0, 1]`.
4. `-3` leaves `result = 9` pending; the outer `)` folds it and combines: `(12 − 3) × 1 + 0 = 9`; `stack = []`.
5. The `+` folds the empty `num`, and the next `(` pushes `(9, 1)`; `stack = [9, 1]`.
6. The final `)` folds `6+8` into 14 and combines: `14 × 1 + 9 = 23`.

Unary minus needs no special casing: a `-` preceding a number or a group simply leaves `sign = -1`, and the next term or parenthesized group is folded in with that sign. Spaces match none of the digit/operator branches and are skipped implicitly. After the loop finishes, the final pending term still has to be folded in, hence `return result + sign * num`. Each character is examined exactly once and every stack operation is constant time; the stack depth equals the parenthesis nesting depth.

**Complexity:** `O(n)` time, `O(n)` space.

# Solutions — Expression Add Operators

## Backtracking with Running Evaluation

Every candidate expression is determined by two independent choices per gap between digits: where operands end (digit splits) and which of `+`, `-`, `*` joins them. The search enumerates these recursively — at each position it tries every operand length extending from `index`, and for each operand tries each operator — so the leaves of the recursion tree are exactly the well-formed expressions. Rather than storing expressions and evaluating them at the end, the search carries the evaluation forward: `current` is the expression's value so far, so the leaf test `current == target` is a single comparison.

Multiplication is the subtle case because it must bind only to the immediately preceding operand, not to the whole running value. The state therefore carries a second number, `prev`: the value of the trailing multiplicand chain. Adding or subtracting an operand `nxt` simply folds it into `current` and resets `prev` to `nxt` (or `-nxt`, so a later `*` reverses the subtraction correctly). Multiplying instead rewrites the tail in place — the new chain value is `prev * nxt`, so the new running total is `current - prev + prev * nxt`. The very first operand seeds both `current` and `prev`.

Leading zeros are pruned inside the split loop: once `num[index]` is `'0'`, no longer operand may start there, so the loop breaks after the single-digit `0` (a lone `0` is legal, `01` is not). Inputs are at most 10 digits, bounding the tree: each of the `n - 1` gaps offers four continuations (extend the operand, or one of three operators), giving roughly `4^(n-1)` candidates, each materializing a string of length up to `2n`; recursion depth is at most `n`, and the collected expressions are output rather than auxiliary working storage.

**Complexity:** `O(n · 4^(n-1))` time, `O(n)` space.

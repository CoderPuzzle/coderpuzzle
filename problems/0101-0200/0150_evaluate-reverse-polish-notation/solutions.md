# Solutions — Evaluate Reverse Polish Notation

## Stack machine

Reverse polish notation places every operator immediately after the two values it combines, so the expression tree is already laid out in evaluation order: by the time an operator is read, both of its operands — each a literal or an already-reduced subexpression — have been seen. That is exactly the discipline a stack consumes. Push each number; on an operator, pop the top two values (the second pop is the left operand — the order matters for `-` and `/`), apply, and push the result. When the tokens run out, the single value left on the stack is the answer.

The code walks `tokens` once under that rule, dispatching on membership in the exact four operator strings — comparing against the four whole strings is what keeps a negative literal such as "-11" out of the operator branch. The one language-sensitive spot is division: the contract truncates toward zero, which C++, Java, Go, and Rust integer division already do, while Python's `//` and JavaScript's `Math.floor` round toward negative infinity. The Python, JavaScript, and TypeScript ports floor the quotient of the absolute values and reapply the sign, which yields the truncated quotient in integer arithmetic alone.

Every value that can appear is bounded: raw operands lie in [-200, 200], and the statement promises the answer and all intermediate calculations fit a signed 32-bit integer, so nothing on the stack ever exceeds 2^31 - 1 in magnitude. Accumulating in 64-bit (`long long`, `long`, `int64`, `i64`) keeps each individual `+`, `-`, or `*` far from its own overflow boundary — even a hypothetical product of two maximal intermediates, about 4.6 × 10^18, would sit inside the signed 64-bit range — and the same bound keeps the double-based ports exact, since every value that can occur lies far below 2^53.

**Complexity:** `O(n)` time, `O(n)` space for the operand stack.

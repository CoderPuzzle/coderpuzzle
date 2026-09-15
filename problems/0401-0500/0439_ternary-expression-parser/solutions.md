# Solutions — Ternary Expression Parser

## Stack evaluation, right to left

Right-to-left grouping means each `'?'` pairs with the nearest `':'` that
balances it, so the conditional closest to the right end of the string is
always a complete, self-contained unit. That observation pays out directly when
the scan runs backwards: leaves and `':'` separators are pushed onto a stack as
they come, and by the time a `'?'` arrives the values sitting on top are
exactly its two operands — the true branch on top, the `':'` separator below
it, then the false branch. Both branches have already collapsed to single
characters, because every conditional nested inside them met its own `'?'`
earlier in the scan.

The condition is the character immediately left of the `'?'` — always `'T'` or
`'F'`, never a digit or a nested expression — so the scan consumes that one
character along with the operator, picks the branch the condition demands, and
pushes the choice back as the conditional's value. Each `'?'` shrinks the stack
by a net two characters, and when the scan falls off the left end exactly one
value remains: the answer, a digit, `'T'`, or `'F'`. The input is guaranteed
valid, so the pops never underflow and no other validation is needed.

Every language keeps the stack as a plain sequence of characters — a Python
list, a Java `ArrayDeque`, a C++ `vector`, a Go byte slice, a Rust `Vec<u8>`,
JS/TS arrays — and all seven run the identical single pass.

**Complexity:** `O(n)` time, `O(n)` space.

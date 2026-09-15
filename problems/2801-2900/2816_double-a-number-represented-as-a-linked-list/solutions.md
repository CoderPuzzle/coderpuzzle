# Solutions — Double a Number Represented as a Linked List

## Lookahead-carried single pass

A carry moves only upward through the list, and whether a position emits one
is decided by its own original digit alone: doubling a digit of five or more
produces at least ten all by itself, while a digit of four or less cannot
cross even with the largest incoming carry a doubling pass can deliver,
since that carry is at most one (`2 * 4 + 1 = 9`). Each position therefore
receives its carry-in from one fact about the digit directly below it, which
means the whole transformation can run top-down in a single sweep — no
reversal, no stack of pending values. Walking forward, every node reads its
successor's digit while that successor is still untouched, folds it into
`value * 2 + carryIn`, keeps the remainder, then steps on; each original
digit is examined exactly once and the last node's null successor yields a
zero carry-in.

Whether the result is longer than the input depends only on the original
head digit, so it is read once before any mutation and remembered. When it
was five or more the doubled number has one extra digit: a fresh node
carrying the single leftover one is prepended to the head after the sweep.
Otherwise the rewritten list is already the answer. All arithmetic stays
inside `2 * 9 + 1 = 19`, so plain 32-bit integers are comfortable
everywhere.

The loop is iterative by design — with up to ten thousand nodes, the obvious
recursive restatement over the list would brush against default interpreter
and JVM stack limits for no gain, and the work per node is one multiply-add
and a modulo.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the prepended node when the number grows.

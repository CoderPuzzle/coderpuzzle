# Solutions — Print Immutable Linked List in Reverse

## Recurse to the end, print on the way back

The list can only be walked forward — `getNext()` is the single move — and
values must come out in the opposite order of that walk. That inversion is
exactly what a call stack does for free: advance to the next node _before_
printing anything, and every node's own `printValue()` naturally fires only
after everything downstream of it has already printed. The base case is the
end of the list (`getNext()` returns null), so the recursion reads: if
`head` is not null, recurse on `head.getNext()`, then `head.printValue()`.

Each node is visited once and each API call happens once per node — one
`getNext()` from the caller plus one `printValue()` on the way back — giving
linear time. The price is stack depth proportional to the list length,
`O(n)` space for the recursion frames; with `n <= 1000` this stays far below
any practical limit.

**Complexity:** `O(n)` time (one traversal, two API calls per node), `O(n)`
space for the call stack.

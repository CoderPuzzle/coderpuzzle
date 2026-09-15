# Solutions — Lexicographically Smallest String After Applying Operations

## Exhaustive search over the bounded reachable-state graph

Treat every distinct string obtainable from `s` as a node and each
operation as an edge to the string it produces, then explore that graph
outward from `s` with a queue, marking each string visited the moment it
is discovered so no string is ever expanded twice. This is a plain
breadth-first search: no assumption is made about which strings are
reachable ahead of time, so it can never miss a state the two operations
could actually produce. The search terminates because the state space is
provably finite and small — repeatedly adding `a` to the same positions
returns to the starting digits after at most 10 applications (adding
`a` mod 10 cycles with a period dividing 10), and repeatedly rotating by
`b` returns to the starting order after at most `s.length` applications,
so only a bounded combination of the two effects is ever reachable.

Because rotating by `b` shifts every character's index by `b`, and
`s.length` is even, a rotation changes the parity of a character's
index exactly when `b` is odd and leaves it unchanged when `b` is even
— so which original characters ever become eligible for the "add"
operation depends on the parity of `b`, not just its magnitude. Rather
than reasoning about that interaction analytically, the search just
applies both operations literally to whatever string it is currently
holding and lets the visited set absorb any resulting symmetry, which
keeps the algorithm correct regardless of how the two operations
interleave. The lexicographic minimum is simply tracked across every
string popped from the queue, and it is returned once the queue drains.

**Complexity:** `O(n²)` time, `O(n²)` space, where `n` is `s.length`;
the number of reachable states is bounded by a small multiple of `n`
(since `a` is at most 9), and each state costs `O(n)` to expand and
compare.

# Solutions — Permutations III

## Backtracking with parity pruning

An alternating permutation is built position by position, and each choice is
constrained only by what sits immediately to its left: a candidate may not
already be used, and it must differ in parity from the last placed value. That
is exactly the shape of a depth-first walk over a shared `current` buffer — at
each depth, try every value `1..n`, descend past the ones that survive both
tests, and retreat when the buffer is full or nothing fits. Because candidates
are tried in ascending order, the finished permutations emerge already sorted
in the lexicographical order the statement demands, so no post-sort of the
output is needed.

The parity check is the walk's only pruning, and it fires early: the moment a
branch would place two adjacent elements both odd or both even, that whole
subtree — a large fraction of the remaining factorial — is never entered. The
buffer is copied into the results only at a leaf, since it is shared by all
branches on the way back up; the `used` flag of each value is set on the way
down and cleared on the way up so every branch sees the same pool.

The structure of the domain keeps everything tiny: among `1..n` at most
`⌈n/2⌉` values are odd and `⌊n/2⌋` are even, so the tree has at most
`5! · 5! · 2 = 28800` leaves even at the constraint ceiling, and the recursion
never runs deeper than `n <= 10` frames. Every emitted value fits in a byte,
let alone a 32-bit integer, and no port needs a wider intermediate.

**Complexity:** `O(n · A(n))` time where `A(n)` is the number of alternating
permutations (each leaf copies `n` values), `O(n)` auxiliary space excluding
the output.

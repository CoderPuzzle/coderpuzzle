# Solutions — Minimum One Bit Operations to Make Integers Zero

## Gray code inversion

Every state reachable from `n` under these two operations is exactly one
step away from its neighbors in the standard reflected binary Gray code:
operation 1 always flips bit 0, and operation 2 is legal precisely when
flipping bit `i` is the unique way to advance or retreat one position in
that sequence. Gray-coded integers enumerate `0, 1, 2, ...` in increasing
order of "steps from zero," so the answer is the position of `n` in that
ordering — the binary count that Gray-encodes into `n`.

Recovering that position from a Gray-coded value is the standard inverse
transform: repeatedly XOR the running value into an accumulator and shift
right, until the value reaches zero. Viewed bit by bit from the top, this
is the same as peeling off the highest set bit at position `msb`, which
costs `2^(msb+1) - 1` steps on its own, minus whatever the remaining lower
bits already prepay — the identical problem recursively on the smaller
remainder. Both views produce the same count; the iterative cascade below
needs no recursion stack and makes a single pass over `n`'s bits.

**Complexity:** `O(log n)` time, `O(1)` space.

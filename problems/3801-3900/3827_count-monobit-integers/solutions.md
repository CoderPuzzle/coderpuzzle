# Solutions — Count Monobit Integers

A Monobit integer has every bit of its binary representation identical. A
positive integer's representation begins with a 1, so its bits can all agree
only when every one of them is 1: the positive Monobit integers are exactly
the binary repunits 1, 11, 111, ..., each one less than a power of two.
Zero, written "0", qualifies as well. The answer is therefore one for zero,
plus the number of repunits that do not exceed `n`.

## Repunit Walk

The counter starts at 1 for zero, and `rep` starts at 1 — binary `1`, the
smallest repunit. Each pass sets `rep = 2 * rep + 1`, which appends one more
1-bit and so visits the repunits in increasing order: 1, 3, 7, 15, .... Every
value still `<= n` bumps the counter; the first value past `n` ends the loop,
because the sequence is strictly increasing and nothing later can qualify.
For `n = 0` the walk never starts and the answer is the initial 1; at the
other end `n = 1000` counts the nine repunits 1 through 511 (1023 already
exceeds the cap) and returns 10.

With `n <= 1000` the loop runs at most ten steps and every value it touches
stays at or below 1023, so ordinary 32-bit arithmetic carries everything —
Java and C++ `int`, Go `int`, Rust `i32` — and Python's unbounded integers
need no care at all. In JavaScript and TypeScript every value sits far below
the 2⁵³ exact-integer range of a `Number`, so plain arithmetic is exact there
too. The walk is iterative and keeps only two counters — no recursion, no
auxiliary memory.

**Complexity:** `O(log n)` time, `O(1)` space.

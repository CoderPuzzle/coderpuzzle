# Solutions — Sum of Two Integers

## Add the bits, then add the carries

XOR is addition with the carries dropped — `1 ^ 1` is `0` precisely where
`1 + 1` writes a `0` and remembers a `1`. AND collects where those remembered
ones belong, and one left shift moves each carry under the digit it inflates.
So a round of `a = a ^ b` paired with `b = (a & b) << 1` trades the pair for
another pair with the same sum, its pending carries all shifted strictly
higher; when `b` reaches `0`, `a` is the answer. `1 + 2` finishes in one round
(the patterns `01` and `10` never coincide, so the carry is empty), while
`2 + 3` needs two: `10 ^ 11` leaves `01` with a carry of `100`, and the second
round settles at `101`.

The loop cannot run long, because every carry bit sits strictly higher than
the ones from the round before — on a 32-bit word at most 32 rounds can pass,
so the count is bounded by the width, not by the operands. Two's complement is
what makes negatives just work: a negative operand already is its wrapped
addend, `-5 + 5` walks the partial sum and the lone pending carry up the word
in lockstep until the carry shifts off the top and leaves `0`, and no separate
subtraction path ever appears. The bounds `-1000 <= a, b <= 1000` keep every
sum inside `[-2000, 2000]`, far from either end of the word.

The code states one 32-bit masking discipline in every language. Python's ints
never wrap, so it masks every intermediate to the low 32 bits and sign-extends
the final pattern back into a negative int; the fixed-width languages — an
unsigned accumulator in C++, the signed int types elsewhere — inherit the same
mask from the integer type itself, wrapping each intermediate for free.

**Complexity:** `O(1)` time, `O(1)` space.

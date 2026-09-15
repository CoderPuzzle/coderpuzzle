# Solutions — Hamming Distance

## XOR, then count with a shift loop

XOR collapses the whole question into one pattern: wherever `x` and `y` hold
the same bit it writes a `0`, and wherever they differ it writes a `1`. The
Hamming distance is therefore just the number of set bits in `x ^ y`. For the
first example, `1 ^ 4` is `0001 ^ 0100 = 0101` — two surviving ones, and the
answer is `2`.

Counting runs one bit per round. Each pass adds `z & 1` to the running
distance and shifts the pattern right, so the lowest bit is consumed and
everything above it moves down to take its place; the loop stops when the
pattern empties. Because `0 <= x, y <= 2³¹ - 1`, the pattern never exceeds 31
bits, so the loop runs at most 31 times no matter which pair arrives — the
work is bounded by the word's width, not the operands' size.

Nothing wider ever appears, which keeps every language on its native integer.
Python's unbounded ints need no mask since the pattern is already small; the
fixed-width `int`/`i32` types hold it exactly; and in JavaScript and
TypeScript the bitwise operators coerce to signed 32-bit two's complement,
which a non-negative 31-bit pattern never leaves.

**Complexity:** `O(1)` time, `O(1)` space.

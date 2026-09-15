# Solutions — Number of 1 Bits

## Clearing the lowest set bit

Subtracting one from `n` borrows through the trailing zeros: every trailing zero becomes a one, the lowest set bit flips off, and the higher bits are untouched. ANDing that back into `n` therefore clears exactly the lowest set bit and leaves everything else alone, so the loop `n &= n - 1` runs precisely once per set bit — never wasting a turn on the zero bits a shift-based scan would step through. On this problem's 32-bit patterns that is at most 32 iterations, and 16 on average for a uniform pattern.

The same three-line shape is written verbatim in all seven languages, which is why it was picked over the builtin population counts: Python has `int.bit_count`, Java `Long.bitCount`, C++ `__builtin_popcountll`, Go `bits.OnesCount64`, Rust `count_ones` — but JavaScript and TypeScript have no popcount builtin at all, and the one uniform alternative there would be this same loop anyway. The width note: `n` rides a 64-bit slot so every pattern up to `2³² − 1` crosses the wire intact and stays positive in the typed languages; in JavaScript the `&` operator computes mod `2³²`, which is exactly the problem's width, so patterns at or above `2³¹` keep all 32 bits (as negative intermediates) and still lose one set bit per turn.

For the statement's follow-up — many calls on the same machine — the practical answers are the hardware popcount instruction behind those builtins, or per-call memoization when the inputs repeat; neither changes a single call's count, since `n & (n - 1)` is already proportional to the answer rather than to the width.

**Complexity:** `O(k)` time, where `k` is the number of set bits (at most 32), and `O(1)` space.

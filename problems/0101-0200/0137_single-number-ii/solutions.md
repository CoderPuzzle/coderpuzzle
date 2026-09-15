# Solutions — Single Number II

Two constant-space reads of the mod-3 structure; one examines each bit
position separately, the other tracks all 32 counters in two registers at
once.

## bit_count

XOR cancels even occurrence counts, so it cannot help when values appear three times. Instead, look at the array one bit position at a time: every value appearing three times contributes either 0 or 3 to the count of set bits at a position — always a multiple of three — while the unique value contributes exactly 0 or 1. So for each of the 32 bit positions, the set-bit count taken modulo three is precisely that bit of the answer.

The code loops the 32 positions, sums `(value >> i) & 1` over the array, and sets bit i of the result whenever the count is not divisible by three. A final step repairs the sign: Python integers are unbounded, so a pattern with bit 31 set gets assembled as a large positive number and must be reinterpreted by subtracting 2^32, yielding the intended negative 32-bit value (the fixed-width ports simply let the natural 32-bit type do the reinterpreting).

Thirty-two passes over the array are still linear time — the constant 32 is independent of n — and the only storage is a handful of scalars, satisfying the constant-space requirement that rules out the obvious counting hash map.

**Complexity:** `O(n)` time, `O(1)` space.

## state_automaton

Per-bit counting can be run for all 32 positions simultaneously if the counts are compressed into two registers. Think of each bit position as a tiny automaton driven through the values: a bit starts cleared, moves into `ones` the first time it is seen, into `twos` the second, and clears again on the third — a mod-3 cycle `00 -> ones -> twos -> 00`. The transitions are written as whole-word bitwise updates: `ones = (ones ^ v) & ~twos` toggles membership using the old `twos` as a guard (a bit sitting in `twos` must not re-enter `ones` — it is on its way out), and `twos = (twos ^ v) & ~ones` does the symmetric update against the freshly computed `ones`.

After the scan, every bit seen a multiple of three times has cycled back to clear in both registers, so `ones` holds exactly the bits of the value that appeared once — no assembly, no sign repair, and no per-position loop: one pass with a fixed handful of word operations per element.

**Complexity:** `O(n)` time, `O(1)` space.

# Solutions — Number of Bit Changes to Make Two Integers Equal

## Submask check, then count the cleared bits

The single allowed move clears a set bit of `n` to `0`, so any sequence of
changes only ever deletes ones: `n` can become exactly the submasks of its
starting value and nothing else. Feasibility is therefore a one-line test —
`k` is reachable precisely when every bit of `k` is already set in `n`, that
is when `n & k == k`. If some bit of `k` finds a `0` in `n` there is no way
to create it and the answer is `-1`; in particular this covers every input
where `k` holds more set bits than `n`.

When `k` is a submask, each change fixes exactly one position where `n`
holds a `1` and `k` holds a `0`, and no position ever needs a second visit,
so the minimum number of changes is simply how many such positions exist.
Since `k` never contributes a bit outside `n`, those positions are exactly
the set bits of `n ^ k`: for `n = 13` (`1101`) and `k = 4` (`0100`) the xor
is `1001`, so the two stray ones are cleared and the answer is `2`. The
count itself walks the pattern one bit per round — add `z & 1`, shift right,
stop at zero.

Nothing wide ever appears: inputs are at most `10⁶ < 2²⁰`, so the xor
pattern fits in 20 bits, the answer never exceeds 20, and every language
stays on its native integer. Python's unbounded ints need no mask; the
fixed-width `int`/`i32` types hold the non-negative pattern exactly; and in
JavaScript and TypeScript the bitwise operators coerce to signed 32-bit
two's complement, which values below `2²⁰` never leave.

**Complexity:** `O(log n)` time, `O(1)` space.

# Solutions — Number of Unique XOR Triplets I

## Bit-Length Construction

The values are exactly `1..n`, so only `n` matters. Let `b` be the bit
length of `n`, so `2^(b-1) <= n < 2^b`. Every element is below `2^b`, and
XOR-ing values below `2^b` never leaves that range — no triplet can
produce a value of `2^b` or beyond, which caps the count of unique values
at `2^b`. This bound is tight for every `n >= 4`: every value in
`[0, 2^b)` is reachable. Pair XORs alone cover all of `[0, 2^(b-1))` —
`0` comes from two equal elements, and any `v >= 1` below `2^(b-1)` is
`x XOR y` for two distinct elements of `[1, 2^(b-1)]`, all available
since `2^(b-1) <= n` and `2^(b-1) >= 4` offers more than one choice.
Then for any target `t < 2^b`, split off its top bit and
pick an element `z` of `[1, n]` matching that bit (`1` for a cleared top
bit, `2^(b-1)` for a set one): the remaining low part is below `2^(b-1)`,
hence a pair XOR, and `t` = that pair XOR `z` — a valid triplet value.
The remaining case `n = 3` checks directly: values `{1, 2, 3}` produce
exactly `{0, 1, 2, 3}` (e.g. `1 XOR 2 XOR 3 = 0`, `3 XOR 3 XOR 3 = 3`),
which is again `2^b`.

Small inputs fall out separately: for `n = 1` the only triplet value is
`1`, and for `n = 2` they are `{1, 2}`, so the answer is `n` itself. For
`n >= 3` the answer is `2^b`, one shift off the bit length — constant
time, no scan of `nums` needed at all. The largest answer within the
constraints is `2^17 = 131072` for `n = 10⁵`, far inside 32 bits.

**Complexity:** `O(1)` time, `O(1)` space.

# Solutions — Sum of Increasing Product Blocks

## Shared counter with per-factor reduction

The blocks tile the positive integers exactly — block `i` consumes the next
`i` consecutive integers — so one walk suffices. Keep a counter `cur` naming
the next integer not yet placed in any block; for each `i` from 1 to `n`,
build the block as a product starting at 1, multiply in `cur`'s next `i`
values, and reduce modulo `10⁹ + 7` after every factor. When a block closes,
fold its residue into the running total, reduced as well. Nothing is
precomputed and no block is revisited: `cur` simply advances across block
boundaries, so the first `n` blocks consume exactly `1 + 2 + ... + n`
integers.

Reducing after every factor is sound because `F(n)` combines the blocks using
multiplication and addition alone, which commute with taking residues. This
matters enormously for width: the exact block values grow astronomically —
block 7 already passes 32 bits, block 11 passes every signed 64-bit integer,
and block 1000 is a product of 1000 consecutive integers near 500000 — yet
the reduced state stays tiny. `prod` and the total never reach `10⁹ + 7`,
and `cur` tops out at `500500 = 1000 · 1001 / 2`, so the widest intermediate
anywhere is `prod * cur < 5.1 × 10¹⁴`: comfortably inside a signed 64-bit
integer in the compiled languages, and equally below `2⁵³`, so plain
JavaScript/TypeScript numbers stay exact with no BigInt needed.

The total number of multiply-reduce steps equals the number of integers the
first `n` blocks consume, `n(n + 1) / 2` — 500500 of them at the constraint
ceiling. Each step is constant time over constant extra state (the counter,
the current product, and the total), so the walk needs only `O(1)` space
beyond its inputs.

**Complexity:** `O(n²)` time, `O(1)` space.

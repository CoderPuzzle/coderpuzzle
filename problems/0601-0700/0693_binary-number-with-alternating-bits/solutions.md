# Solutions — Binary Number with Alternating Bits

## Fold the pairs into one mask

Shift `n` right by one and XOR it back onto itself: bit `i` of
`x = n ^ (n >> 1)` is set exactly when bits `i` and `i+1` of `n` differ, and
because the bit above `n`'s top bit is a zero, the fold always keeps its own
top bit set. That single operation compresses the whole question into the
shape of `x`: when `n` alternates, every pairing differs, and `x` comes out a
solid run of ones from bit 0 through `n`'s top bit — a value of the form
`2^(k+1) - 1`. Anywhere two adjacent bits of `n` agree, the fold drives a
zero into that run. For `n = 5` the fold gives `x = 0b111`; for `n = 11`,
whose two low ones collide, it gives `x = 0b1110` with the zero embedded at
bit 0.

Testing for the run is one more operation. A positive integer equals `2^m - 1`
exactly when `x & (x + 1)` is zero: adding one carries into the run's first
clear bit and wipes every one below it, leaving the two values with no bit in
common, while any gap inside the run leaves the bits above the gap untouched
in both operands and the AND catches them. So `0b111 & 0b1000` is zero —
true — and `0b1110 & 0b1111` keeps the high bits — false.

The bound dictates one care point. `n` may reach `0x55555555`, the largest
alternating pattern, whose fold is `2^31 - 1` — so `x + 1` is exactly the
value that overflows a signed 32-bit integer. The solutions keep that
increment defined: C++ holds the fold in an `unsigned int`, Rust widens to
`i64` before adding, Java's wraparound is defined and keeps the 32-bit trick,
Go's native `int` is 64 bits wide, Python's integers are unbounded, and in
JavaScript and TypeScript the operands stay exact as doubles up to `2^31`
while `&` applies its 32-bit conversion — every path folds to the same mask
and answers with the same AND.

**Complexity:** `O(1)` time, `O(1)` space.

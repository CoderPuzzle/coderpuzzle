# Solutions — Reverse Bits

## Bit-by-bit accumulation

The reversal is a queue-to-stack transfer of the 32 bits: read `n` from the bottom while writing the answer from the top, one step per bit. Each iteration shifts the accumulator left by one, ORs in the lowest remaining bit of `n`, then drops that bit — the first bit read ends up at position 31, the last at position 0. Thirty-two iterations later every bit has moved from position `i` to `31 - i`, exactly the pairing the statement's binary tables show.

The contract carries the width guarantee. `n` is even and at most `2³¹ - 2`, so bit 0 and bit 31 of the input are both clear: the input fits a non-negative signed 32-bit integer, and so does its reversal, whose lowest bit mirrors the input's always-clear bit 31. That is also why the shifts need care — Java and JavaScript use `>>>` so a sign bit can never smear down into the position being read, while C++, Go, and Rust hold the pattern in an unsigned 32-bit type for the same guarantee; Python's integers just don't care.

For the follow-up — many calls on the same machine — the loop is only the baseline: swapping predetermined bit groups with mask-and-shift steps (bytes, then nibbles, then bit pairs, then single bits) reverses in five operations, and a 256-entry table of precomputed byte reversals does all 32 bits with four lookups and three shifts.

**Complexity:** `O(1)` time — always exactly 32 iterations — and `O(1)` space.

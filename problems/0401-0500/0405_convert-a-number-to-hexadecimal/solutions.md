# Solutions — Convert a Number to Hexadecimal

## Nibble walk on the two's-complement bits

Two's complement is what makes the negative case free: reading `num` as an
unsigned 32-bit value rewrites `-1` as `0xffffffff`, so every input, positive
or negative, becomes one unsigned quantity to take digits from. The walk never
has to know the sign.

From there the loop is the whole method: take the low nibble, index it into
the alphabet `"0123456789abcdef"` for its lowercase character, and shift the
value right by four until nothing remains. Nibbles come out lowest-first and
are reversed into the final string, and stopping at zero is itself what keeps
leading zeros out of the answer. Zero never enters the loop, so it is answered
directly as `"0"`.

Only the unsigned reading differs by language: Python masks arithmetically
(`num & 0xFFFFFFFF`), the fixed-width languages reinterpret the same bits
(`unsigned int` in C++, `uint32` in Go, `as u32` in Rust, Java's unsigned
`>>>` shift), and JavaScript's `>>> 0` hands back the unsigned 32-bit view. No
library conversion routine is called anywhere.

**Complexity:** `O(1)` time — a 32-bit value has at most 8 nibbles — and
`O(1)` space.

# Solutions — Count Triplets with Even XOR Set Bits I

## Parity counting

XOR cannot change parity on its own: each bit position of `x ^ y ^ z`
holds the sum, modulo 2, of the three operands' bits in that position, so
`popcount(x ^ y ^ z)` is even exactly when an even number of the three
operands — none or two — has an odd popcount. Testing every `(i, j, k)`
triplet to learn one bit apiece collapses into classifying each element
once.

The code counts `even[k]` and `odd[k]` per array and returns the four
qualifying products: the all-even combination plus the three ways to pick
exactly two odd arrays. At these limits (`100³ = 10⁶` possible triplets)
the answer fits easily in 32 bits, so plain `int` arithmetic works
throughout — the bitwise population count is the only help needed from the
language (`bin().count`, `Integer.bitCount`, `__builtin_popcount`,
`bits.OnesCount`, `count_ones`, or a shift loop for JavaScript).

**Complexity:** `O(n + m + p)` time, `O(1)` space.

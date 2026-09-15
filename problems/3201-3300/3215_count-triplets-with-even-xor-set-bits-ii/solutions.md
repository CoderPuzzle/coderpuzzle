# Solutions — Count Triplets with Even XOR Set Bits II

Testing every `(i, j, k)` combination costs cubic time to learn a single bit
about each triplet. That bit is already decided by the three operands alone:
XOR cannot create or destroy parity, so the whole count collapses into the
popcount parities of the elements themselves.

## Parity counting

Every bit position of `x ^ y ^ z` holds the sum, modulo 2, of the three
operands' bits in that position, and summing those contributions across
positions gives
`popcount(x ^ y ^ z) ≡ popcount(x) + popcount(y) + popcount(z) (mod 2)`.
So a triplet's XOR has an even number of set bits exactly when an even
number of its three operands — 0 or 2 — carries an odd popcount.

That reduces each array to two numbers: `even[k]` and `odd[k]`, how many of
its elements have even and odd popcount. The qualifying triplets are the 0-odd
combination `even[0] * even[1] * even[2]` plus the three 2-odd combinations
`odd[0] * odd[1] * even[2]`, `odd[0] * even[1] * odd[2]` and
`even[0] * odd[1] * odd[2]`. With lengths up to `10⁵` the total reaches
`10¹⁵`, so typed languages must accumulate in 64-bit integers; JavaScript's
Number stays exact because `10¹⁵ < 2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.

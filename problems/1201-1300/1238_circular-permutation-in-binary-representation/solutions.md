# Solutions — Circular Permutation in Binary Representation

## Reflected gray code, translated by start

The reflected gray code lists every n-bit value exactly once with adjacent
entries differing in a single bit, and its closed form is `g(i) = i ^ (i >> 1)`
— XOR-ing an index with itself shifted halves it into a value whose binary
steps flip one bit per increment. The wrap-around property holds too: `g(0)`
and `g(2^n - 1)` differ in exactly the top bit.

Translating the whole list by a constant `start` (XOR again) preserves both
properties, because XOR by a constant is a bijection that maps one-bit
differences to one-bit differences. The first element becomes
`start ^ g(0) = start`, so `p[i] = start ^ (i ^ (i >> 1))` is exactly the
required circular permutation, emitted in one pass.

**Complexity:** `O(2^n)` time, `O(2^n)` space for the output.

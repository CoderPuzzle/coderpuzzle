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

![For n = 2, start = 3 the reflected gray code walks 00, 01, 11, 10 with a single bit flipping per step, and XOR-ing the whole list by start = 11 translates it to [3, 2, 0, 1] with every one-bit step and the wrap 11 -> 01 preserved.](figures/solution-gray-xor-start.svg)

**Complexity:** `O(2^n)` time, `O(2^n)` space for the output.

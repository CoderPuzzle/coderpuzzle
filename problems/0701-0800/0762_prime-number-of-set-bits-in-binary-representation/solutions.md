# Solutions — Prime Number of Set Bits in Binary Representation

The scan over `[left, right]` is the whole job, and the bound settles the
primality question before it is ever asked per candidate: `right` stays at or
below `10⁶`, so every value in range fits in twenty bits, its set-bit count
is one of `1` through `19`, and the primes in that span are exactly
`2`, `3`, `5`, `7`, `11`, `13`, `17`, `19` — a fixed menu the crawl's own
hint names.

## Popcount each candidate against a tiny prime table

Mark those eight primes in a 0/1 table indexed by set-bit count and the
per-candidate work collapses to one popcount plus one array read: walk the
range upward, count the set bits of each number, and add the table entry to
a running total. The table is built once before the walk, so no candidate
ever runs a division — primality was decided the moment the table was
filled.

Index `1` is the trap the table absorbs: a lone set bit — the value `1`
itself and every power of two — is not prime, and that slot holds a `0` for
exactly that reason. The count can reach nineteen (`524287` is nineteen
1's) but never twenty, since `2²⁰ - 1` already exceeds the bound. Every
number in the walk is positive and the total is bounded by the range width,
so 32-bit integers carry it comfortably in every language, and the pass
keeps no state beyond the table and the total.

**Complexity:** `O((R−L)·b)` time, `O(1)` space — `b` the bit width of the
values, at most 20 under the stated bound.

# Solutions — Find The K-th Lucky Number

## Block arithmetic, then binary counting

Sorted increasingly, the lucky numbers are the strings over `{4, 7}` ordered by
length first — any shorter number beats any longer one — and within one length
by plain digit comparison, `4` before `7`. Each length contributes exactly
`2^len` numbers, so the lengths tile the ranks into consecutive blocks: the
one-digit numbers cover `k = 1..2`, the two-digit ones `k = 3..6`, and the
c-digit block covers `k = 2ᶜ − 1 .. 2ᶜ⁺¹ − 2`. Locating the answer's length is
a scan that grows c until the cumulative count `2ᶜ⁺¹ − 2` reaches k; for the
largest allowed input this settles at c = 29, because `2³⁰ − 2 = 1073741822 ≥ 10⁹`
while `2²⁹ − 2 < 10⁹`.

Inside the block, subtracting the shorter numbers gives a zero-based rank
`x = k − (2ᶜ − 2) − 1`, and counting x in binary enumerates the block in
exactly the statement's order: the substitution `0 → 4`, `1 → 7` maps c-bit
binary counting onto the increasing order of the c-digit lucky strings, since
bit order `0 < 1` mirrors digit order `4 < 7` and shorter lengths were already
peeled off by the block scan. Zero-padding x's binary representation to c
digits and substituting digits for bits therefore yields the answer directly.

The whole computation is a bounded scan plus c bit reads on a 29-bit integer.
The mapping even collapses to a one-liner worth noticing: since the count of
shorter numbers is `2ᶜ − 2`, x equals `(k + 1) − 2ᶜ`, i.e. the binary of `k + 1`
with its leading 1 stripped — the block boundary is literally the top bit of
`k + 1`.

**Complexity:** `O(log k)` time, `O(log k)` space.

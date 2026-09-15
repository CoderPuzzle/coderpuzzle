# Solutions — Count Good Numbers

Goodness is decided position by position, and the positions are
independent: an even index may carry any of the five even digits
(0, 2, 4, 6, 8) and an odd index any of the four prime digits (2, 3, 5,
7). Multiplying the per-position choices gives the closed form
`5^e * 4^o`, where `e = ceil(n/2)` counts even indices and `o = floor(n/2)`
odd ones — for `n = 4` that is `5² · 4² = 400`.

## Fast modular exponentiation

With `n` up to `10¹⁵` the exponent cannot be expanded one factor at a
time; binary exponentiation folds it in about 50 modular squarings
instead. The helper walks the exponent's bits, squaring the base and
multiplying it into the result on set bits, all under the `10⁹ + 7`
modulus — every intermediate product stays below `(10⁹ + 6)² ≈ 10¹⁸`,
which fits a 64-bit integer (a Java `long`, C++ `long long`, Go `int64`,
Rust `i64`) but overflows JavaScript/TypeScript's exact `Number` range of
`2⁵³`, so those two languages carry the products in `BigInt`. The input
itself is safe everywhere: `n ≤ 10¹⁵ < 2⁵³` arrives exactly.

The loop is iterative rather than recursive (the crawl's hint points at
recursion, but the bit-walking form is the same halving structure without
call overhead), and the final `5^e * 4^o` product is reduced once more
before returning, so the result is always the canonical residue in
`[0, 10⁹ + 7)`.

**Complexity:** `O(log n)` time, `O(1)` space.

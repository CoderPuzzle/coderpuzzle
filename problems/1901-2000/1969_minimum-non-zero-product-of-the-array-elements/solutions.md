# Solutions — Minimum Non-Zero Product of the Array Elements

Every integer in `[1, 2^p - 1]` pairs with its bitwise complement
`2^p - 1 - x`: the two use exactly opposite bits, so the operation can push
all the high-position 1s onto one of them and leave the other with a single

1. Each complementary pair collapses to `(1, 2^p - 2)` with product
   `2^p - 2`, while the one value with no partner — the all-ones `2^p - 1` —
   stays untouched, because reducing any of its 1s to 0 would force a zero
   somewhere else and drop the product to 0. With `2^(p-1) - 1` such pairs, the
   minimum non-zero product is `(2^p - 2)^(2^(p-1) - 1) · (2^p - 1)`. For
   `p = 3` that is `6³ · 7 = 1512`, matching the example.

## Fast modular exponentiation

The exponent `2^(p-1) - 1` reaches `≈5.8·10¹⁷`, far beyond what expanding
the product element by element could ever complete, so binary exponentiation
folds it in at most 60 squarings. The helper walks the exponent's bits,
squaring the base and multiplying it into the result on set bits, all under
the `10⁹ + 7` modulus. The base `2^p - 2` (up to `≈1.15·10¹⁸`) and its
square fit a 64-bit integer — Java `long`, C++ `long long`, Go `int64`, Rust
`i64` — but overflow JavaScript/TypeScript's exact `Number` range of `2⁵³`,
so those two languages carry the arithmetic in `BigInt`. The final factor
`2^p - 1` is multiplied in and reduced once more, so the returned value is
always the canonical residue in `[0, 10⁹ + 7)`.

The loop is iterative rather than recursive (the crawl's hint points at
recursion, but the bit-walking form is the same halving structure without
call overhead), and no intermediate value exceeds the 64-bit boundary.

**Complexity:** `O(p)` time, `O(1)` space.

# Solutions — Simplified Fractions

## Enumerate and keep the coprime pairs

Every fraction strictly between 0 and 1 with denominator at most `n` is a
pair `(numer, denom)` with `1 <= numer < denom <= n`, so the candidates
number fewer than `n²/2` — at most 4950 for `n = 100`. Each candidate is
kept exactly when it is already in lowest terms, which the gcd test
decides: `gcd(numer, denom) == 1`.

Iterating numerators in the outer loop and denominators in the inner one
produces the listing order the examples show (`1/2`, `1/3`, `1/4`, `2/3`,
`3/4`), and the fraction is formatted directly as `numer + "/" + denom`.
The gcd is the Euclidean algorithm — a handful of modulo steps per pair —
so the entire enumeration is a few tens of thousands of operations.

**Complexity:** `O(n² log n)` time with the per-pair Euclidean gcd,
`O(n²)` space for the answer in the worst case.

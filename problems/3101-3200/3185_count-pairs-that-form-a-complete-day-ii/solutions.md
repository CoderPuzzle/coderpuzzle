# Solutions — Count Pairs That Form a Complete Day II

## Complementary Remainder Counts

Only residues modulo 24 decide whether a pair completes a day, and there
are just twenty-four classes — so a complete-day count never needs to look
at indices at all once values have been reduced. Sweep left to right
keeping one running bucket per residue class: when index j arrives with
residue r, every earlier index whose residue is `(24 - r) % 24` pairs with
it to hit an exact multiple of 24 hours. Add that running count to the
answer first, then drop r into its own bucket, and each unordered pair is
credited exactly once — by its right endpoint.

This single scan mirrors the crawl's own hint and turns the quadratic
pair census of the small twin into linear work. Order inside a bucket is
irrelevant because any two members of complementary classes match, and
self-complementary classes (`0` and `12`) pair among themselves exactly
the way the streaming subtraction counts them.

The scale change matters in the arithmetic: `n` reaches `5 × 10⁵`, so the
answer can climb to `C(500000, 2) = 124999750000`, far beyond a signed
32-bit integer. Fixed-width languages accumulate in 64-bit types (Java
`long`, C++ `long long`, Go `int64`, Rust `i64`); JavaScript and
TypeScript numbers stay exact well past that bound, holding integers up
to 2⁵³ ≈ 9 × 10¹⁵ — roughly seventy thousand times this maximum.

**Complexity:** `O(n)` time, `O(1)` space.

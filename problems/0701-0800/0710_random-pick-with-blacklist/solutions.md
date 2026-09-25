# Solutions — Random Pick with Blacklist

## Compressed Range with Hash Remap

Exactly `n - b` values are allowed, so a uniform draw over the compressed range `[0, n - b)` has the right cardinality — the problem is that some of those draws land on blacklisted values. The canonical construction repairs this once, in the constructor: every blacklisted value `v < n - b` is remapped onto a **free** value from the upper part `[n - b, n)` (free values are plentiful there — that part holds `b` values of which only some are blacklisted, always leaving at least as many free slots as there are low blacklisted values to relocate). `pick()` then draws uniformly over `[0, n - b)` and follows the map for the relocated few — a single built-in random call per pick, uniform over exactly the allowed set, which is what the statistical judge measures (each judged `pick` runs thousands of draws; every value must be legal and each allowed value's frequency must match `1 / (n - b)` within a tolerance band).

![For n = 7 with blacklist [2,3,5], the split at n − b = 4 remaps blacklisted 2 and 3 onto the free upper values 4 and 6, so one uniform draw over [0, 4) returns only the legal values 0, 1, 4, 6.](figures/solution-compressed-range-hash-remap.svg)

Both canonical solutions build the map lazily over the upper range — Python walks a generator of non-blacklisted values from `n - b` upward, Java advances a pointer skipping blacklisted entries — so construction costs `O(b)` hash operations regardless of how large `n` is. Rejection sampling, by contrast, needs `n / (n - b)` expected random calls per pick and degenerates as the blacklist densifies.

**Judged scale.** A frequency bucket needs ~1400 expected draws to clear the noise floor with margin, so the statistical cases keep `n - b <= ~200` allowed values (draw counts up to ~300000) with `n` up to ~2 * 10⁴ — including dense blacklists that leave only a handful of allowed values, blacklists clustered at the bottom (everything must be remapped) and at the top (nothing must). The constraints' ceiling (`n` up to 10⁹) is unreachable by any enumerable table; the algorithm's `O(b)` construction and `O(1)` pick do not depend on `n`'s magnitude.

**Complexity:** `O(b)` construction, `O(1)` per `pick` (exactly one random call), `O(b)` space.

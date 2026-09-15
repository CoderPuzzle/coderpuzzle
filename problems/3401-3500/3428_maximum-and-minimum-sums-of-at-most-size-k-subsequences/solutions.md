# Solutions — Maximum and Minimum Sums of at Most Size K Subsequences

Enumerating subsequences is hopeless — there are up to `Σ_{s<=70} C(10⁵, s)`
of them — but each one contributes only its minimum plus its maximum, and
after sorting, an element's chances of being either endpoint are pure
binomial counting.

## Sorted contribution counting

Sort `nums`. In sorted order, `nums[i]` is the maximum of exactly those
subsequences whose other members all come from the `i` smaller entries: a
subsequence of size `s` fixes `nums[i]` as its max in `C(i, s - 1)` ways, so
over all sizes `1..k` the count is `g(i) = Σ_{j<k} C(i, j)`. Symmetrically
`nums[i]` is the minimum of `g(n - 1 - i)` subsequences (choosing from the
larger entries). The answer is `Σ nums[i] · (g(i) + g(n-1-i)) mod 10⁹ + 7`,
with duplicates handled automatically because the counts are over indices,
not values — `[1,1,1]` with `k = 2` gives each 1 a count of `1 + 3 = 4`,
totalling 12.

Rather than computing `g` from factorial tables at every `i`, each partial
row sum rolls in O(1): Pascal's identity makes
`g(i) = 2·g(i-1) − C(i-1, k-1)`, so one binomial per step (from tables built
once up to `n ≤ 10⁵`, inverted by fast exponentiation) advances the whole
sequence. The elementwise pass multiplies values up to `10⁹` by counts up to
`2·(10⁹ + 6)`, so every product runs in 64-bit (`long` / `int64` / `i64`);
in JavaScript and TypeScript the same products of mod-reduced residues reach
`(10⁹ + 6)² ~ 10^18`, past the double's exact `2^53` range, so those two
versions run their arithmetic on `BigInt` and convert back after the final
reduction.

**Complexity:** `O(n log n + n)` time, `O(n)` space.

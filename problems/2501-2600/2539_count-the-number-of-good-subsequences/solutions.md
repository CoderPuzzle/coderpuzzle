# Solutions — Count the Number of Good Subsequences

## Count by Shared Frequency

Every good subsequence is identified by the frequency `m` shared by all
its present letters, which suggests summing over `m` directly, as hints 1
and 2 outline. For a fixed `m`, each of the 26 letters independently
either stays out or donates exactly `m` occurrences —
`C(count_c, m)` ways to choose which index positions — so a single
product of `(C(count_c, m) + 1)` over the letters present in `s` counts
all subsequences whose common multiplicity is exactly `m`. One subtlety:
the all-absent pick sits inside every per-`m` product, so each term
contributes `product − 1`; subtracting once globally instead leaves one
phantom empty pick and inflates single-letter inputs (a trap the small
sweeps catch immediately).

Binomials come from factorial tables over the maximum letter count,
divided through Fermat-inverse factorials — for prime `p`,
`x^(p−2)` is the inverse of `x` mod `p` (hint 3) — after which the whole
answer is `Σ_m Π_c (C(count_c, m) + 1) − m-terms`, everything reduced mod
10⁹ + 7. The two nested loops are `O(26 · n)` with table construction at
most `O(n)` extra; JavaScript carries the modular products in BigInt
because multiplying two ~2³⁰ residues breaches Number's exact 2⁵³ bound,
while every other language multiplies safely inside native 64-bit.

**Complexity:** `O(n + 26·n)` time, i.e. `O(n)`; `O(n)` space.

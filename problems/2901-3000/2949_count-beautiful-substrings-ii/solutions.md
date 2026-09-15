# Solutions — Count Beautiful Substrings II

## Prefix balances over one period

A beautiful substring has equal vowel and consonant counts — the prefix
vowel-minus-consonant balance is the same at both ends — and when both
counts equal x, the divisibility condition is x * x % k == 0. Factoring k
= p₁^a₁ · p₂^a₂ ⋯, that holds exactly when x is a multiple of
m = p₁^⌈a₁/2⌉ · p₂^⌈a₂/2⌉ ⋯, the least x ≥ 1 with x² ≡ 0 (mod k), so a
substring is beautiful precisely when its ending balances agree and its
length is a multiple of 2m — that is, both end positions share the same
index modulo 2m.

One pass over s turns that into pair counting: walk the prefix balances
keeping a hash map keyed by the pair (balance, index mod 2m); every
position contributes the number of earlier positions with an identical
key. There are at most k ≤ 1000 trial divisions to build m, then a single
linear scan; the tally of up to ~1.25 × 10⁹ pairs fits in 32 bits but is
accumulated in 64-bit integers. Each position is visited once with O(1)
expected map work, and the map never holds more than one entry per prefix.

**Complexity:** `O(n + √k)` time, `O(n)` space.

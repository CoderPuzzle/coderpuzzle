# Solutions — Integer Break

## Max-product table with the identity inner max

Let `best[i]` be the largest product of a sum of two or more positive integers
totalling `i`. Every such sum has a first part `j`, and the rest is either a
single remaining part — the whole number `i - j`, making the two-part sum
`j + (i - j)` — or a sum that breaks further, whose best yield is already
tabulated as `best[i - j]`. That is the recurrence
`best[i] = max over j of j * max(best[i - j], i - j)`, and the inner `max`
against the identity `i - j` is precisely the `k >= 2` rule: `i` itself can
never enter as a one-part product, because every table entry is reached only
through a genuine split. The seed `best[1] = 1` is harmless — `1` admits no
two-part sum, and the seed is only ever read under a `max` whose other arm is
the identity `1`.

Filling the table upward from `best[2] = 1` settles the whole domain, and its
small surprises come straight from the two-part rule: `best[3] = 2` (`1 + 2`)
falls below `3` itself, `best[4] = 4` (`2 + 2`) merely ties it, and
`best[6] = 9` (`3 + 3`) is the first answer to beat keeping the number whole.
Threes take over from there — `3 + 3` outearns `2 + 2 + 2`, and any part of
`5` or more gains by shedding a `3` — and the table finds that pattern on its
own: past the tiny cases every answer is a product of 3s with at most a pair
of 2s, ending at `best[58] = 4 × 3¹⁸ = 1,549,681,956`, the domain's largest
value.

The two loops fill one total at a time and reuse every smaller entry freely;
the single table is the only storage. No candidate product along the way
exceeds `best[58]`, so plain 32-bit arithmetic never overflows in any
language, and with `n <= 58` the whole fill is a few thousand operations.

**Complexity:** `O(n²)` time, `O(n)` space.

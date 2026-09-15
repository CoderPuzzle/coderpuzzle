# Solutions — Maximum Number of Subsequences After One Inserting

The counts that matter are per-boundary: how many L's and LC pairs lie
before a cut, and how many T's and CT pairs lie after it.

## Prefix counts plus best per-boundary insertion gain

A forward scan fills `preL[i]` and `preLC[i]` — the number of L's and of
LC pairs strictly before boundary `i` — while accumulating `base`, the
number of LCT subsequences already present in `s` (each T contributes the
LC pairs open when it is read). A backward scan fills `sufT[i]` and
`sufCT[i]`, the T's and CT pairs at or after boundary `i`, symmetrically.
Inserting letter `x` at boundary `i` creates new LCT subsequences only
through the letter itself, so the gain is `sufCT[i]` when `x = L` (each
later CT pair completes), `preL[i] * sufT[i]` when `x = C` (each earlier
L with each later T), and `preLC[i]` when `x = T` (each earlier LC pair
completes). Any other letter, or any position, adds nothing, so the
answer is `base` plus the maximum gain over the `n + 1` boundaries —
`max(base, base + gain)` in the hints' wording, since gains are never
negative.

Letters other than L, C, T are simply skipped by both scans. Every count
is bounded by the number of LC or CT pairs, at most `(n/2)² ≈ 2.5×10⁹`,
and the final total by `((n+1)/3)³ < 4×10¹³` for `n = 10⁵` — beyond
32-bit range but far below 2⁵³, so 64-bit integers (and JavaScript's
`Number`) represent every intermediate exactly.

**Complexity:** `O(n)` time, `O(n)` space.

# Solutions — DI String Match

## Two pointers from both ends

Every character of `s` is a demand on one adjacent pair, and each demand can
be paid with an extreme value: if `perm[i]` is the smallest value not yet
placed, any `I` at position `i` is satisfied no matter what comes after,
because every remaining value is larger. Symmetrically, the largest unused
value satisfies any `D`. So the canonical answer the statement pins — smallest
unused on `I`, largest unused on `D` — falls out of one linear scan holding
nothing but the two extremes.

The scan keeps `lo`, the smallest value not yet placed, and `hi`, the largest;
they start at `0` and `n`. On `'I'` the code appends `lo` and increments it, on
`'D'` it appends `hi` and decrements it. Each step retires exactly one value,
and the retired extreme can never be needed again: `lo` was smaller than
everything left behind, `hi` larger, so neither can serve the opposite kind of
demand later. After `n` steps the two counters have met at the one unplaced
value, which fills the final slot — the output uses each of `0..n` exactly
once and matches `s` by construction.

The pass touches each character once and appends one element per step into a
preallocated-per-language array, so beyond the output itself only the two
counters survive.

**Complexity:** `O(n)` time, `O(n)` space.

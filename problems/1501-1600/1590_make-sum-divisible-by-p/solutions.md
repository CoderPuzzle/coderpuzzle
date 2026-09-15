# Solutions — Make Sum Divisible by P

## Prefix remainders, most recent occurrence kept

Let `target` be the total sum mod `p`. If `target` is already `0`, nothing
needs removing. Otherwise the removed subarray's own sum must leave
remainder `target`, because dropping it has to cancel exactly that excess
from the total. A subarray sum is a difference of two prefix sums, so the
search becomes: for each running prefix remainder `current`, has an
earlier prefix remainder equal to `(current - target) mod p` been seen
before, and how close is the closest one? One pass keeps a map from each
remainder to the _most recent_ index it occurred at — unlike a "does a
multiple exist" question, here the goal is the shortest span, so the
latest occurrence (not the first) gives the smallest gap.

The map is seeded with remainder `0` at index `-1`, standing for the
empty prefix before the array starts. That seed is also exactly the
trap the statement warns about: matching it at the very last index would
report removing the entire array, which is explicitly disallowed. Because
that match's span always equals `n` (the seed sits at index `-1` and the
last index is `n - 1`), rejecting any candidate whose length reaches `n`
excludes precisely that case and no other — every legitimate removal
spans strictly fewer than `n` elements. `p = 1` needs no special case: the
total's remainder mod `1` is always `0`, so the answer is immediately `0`.

Values reach `10⁹` and the array reaches length `10⁵`, so the total can
reach `10¹⁴`; the fixed-width ports accumulate the running prefix sum in
a 64-bit register before taking each remainder mod `p`, keeping every
intermediate value in range.

**Complexity:** `O(n)` time, `O(min(n, p))` space.

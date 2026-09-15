# Solutions — Count Special Subsequences

A special subsequence pairs a leading couple `(p, q)` with a trailing
couple `(r, s)`, gaps of at least one index apart inside each couple and
between them, tied by one equation. With four free indices the count is
quartic to enumerate, but the equation factorizes into a property of
two independent couples — and that is what collapses it.

## Match reduced fractions across a single r-sweep

Rearranged, `nums[p] * nums[r] == nums[q] * nums[s]` reads
`nums[p] / nums[q] == nums[s] / nums[r]`: the leading couple's ratio
equals the trailing couple's ratio, with the trailing one taken right
over left. Values are positive, so each ratio reduces by GCD to a unique
coprime pair — exact integer comparison, no floating point. The count
becomes: over all couple placements allowed by the gap rules, how many
leading/trailing pairs share a reduced fraction.

Ordering by the middle, everything is one pass over `r`. When the sweep
reaches `r`, the couple `(r - 2, r)`'s entire legal prefix — every `p`
at least two before `q = r - 2` — becomes eligible, so those ratios
join a hash counter; then every `s` at least two after `r` computes
`nums[s] / nums[r]` reduced and adds the counter's current tally for it.
A couple is counted exactly when its `q` has cleared `r` by two and its
`s` trails `r` by two, which is precisely the gap rule, so each valid
quadruple is added once, at its own `r`. Both inner loops touch each
index pair once, around `n^2 / 2` GCD-and-hash steps apiece. The tally
can reach `C(997, 4) ≈ 4.1 × 10^10` on an all-equal array — past 32
bits, comfortably inside a 64-bit integer and exact as a JS number below
`2^53`.

**Complexity:** `O(n^2 log V)` time for values up to `V` (each pair
costs one GCD), `O(n^2)` space worst case for the fraction counter.

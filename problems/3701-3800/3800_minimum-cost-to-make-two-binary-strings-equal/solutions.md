# Solutions — Minimum Cost to Make Two Binary Strings Equal

The three operations look like they invite search, but each one only moves
mismatched columns around or pays to overwrite them — so the whole problem
reduces to classifying the mismatched columns and pairing them off at
minimum cost.

## Mismatch-class counting

Only the mismatched columns matter, and every mismatch comes in one of two
kinds: a column with s = '0', t = '1' (call it a 01-mismatch) or its mirror
image s = '1', t = '0' (a 10-mismatch). One pass over the columns counts
both. The operations then decompose cleanly: swapping inside one string can
reorder mismatches but never changes how many of each kind exist, and a
cross-swap at a matched column creates a fresh mismatch pair, so an optimal
plan is fully described by pairing up the existing mismatches as cheaply as
possible.

A 01-mismatch and a 10-mismatch fix each other directly: swap within either
string so those two columns meet, then one more swap exchanges their values
and both become equal — total cost swapCost. The alternative is flipping
one character of each, costing 2 · flipCost, so min(a, b) opposite pairs
cost `min(a, b) · min(swapCost, 2 · flipCost)`. What remains are
|a - b| mismatches of a single kind. Two of a kind also pair up: a
cross-swap at one of them turns it into the opposite kind at no other cost,
and then the same swap trick finishes both — crossCost + swapCost in all,
again competing with 2 · flipCost. If one lone mismatch remains after
pairing (the count was odd), no rearrangement can help and exactly one flip
finishes it.

The arithmetic outgrows 32 bits at the ceiling: n up to 10⁵ with costs up
to 10⁹ lets the total reach about 10¹⁴, so Java, C++, Go and Rust
accumulate and return in 64-bit integers. Python is unbounded, and the
JavaScript totals stay below 10¹⁴ < 2⁵³, where Number arithmetic on whole
integers is exact.

**Complexity:** `O(n)` time, `O(1)` space.

# Solutions — Permutations IV

## Unranking with saturated factorial counts

Because adjacent elements must differ in parity, the parity of every slot
after the first is forced the moment one element is placed. That collapses
counting to a pair of numbers: a prefix with `odd` odd values and `even`
even values still unused has exactly `odd! · even!` completions when those
leftovers fit the forced pattern of remaining slots, and none otherwise.
Unranking then works left to right — try the unused candidates in ascending
order, and the first whose completion count still reaches `k` is committed;
every candidate skipped past has its whole block of permutations subtracted
from `k`. An odd `n` admits no even starter, which the same test expresses
for free: such a prefix leaves leftover parities that cannot fit the forced
pattern, so its count is zero and the scan walks over it.

The factorials outrun 64-bit integers long before `n = 100`, but the counts
only ever face the comparison against `k <= 10¹⁵`. Saturating them at a cap
of `2 · 10¹⁵` preserves every decision: a saturated count still reads as
"more than `k` needs", while any count below the cap is exact — and those
are the only ones ever subtracted, so `k` stays exact throughout. The same
bound keeps the JavaScript ports safe, since `k`, the cap, and every
unsaturated product lie below 2⁵³, and a product that would exceed the cap
rounds to a float still far above it.

Each of the `n` positions scans at most `n` candidates with constant work
per candidate, on top of a factorial table of `⌈n/2⌉ + 1` saturated
entries. Everything is iterative — no recursion at all, so no stack-depth
concern at `n = 100`.

**Complexity:** `O(n²)` time, `O(n)` space.

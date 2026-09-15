# Solutions — Number of Great Partitions

## Subset-sum complement under an inclusion–exclusion subtraction

Directly counting great partitions would mean verifying both group sums
across all `2^n` assignments, far past any budget. The hint flips the
view: a partition is _bad_ exactly when its first group's sum falls
under `k` or its second group's does. Both failure events are counted by
the same collection — subsets of nums whose sum is already below `k` —
once attributed to group one and once to group two.

When the total sum reaches `2k` the two failures can never coincide
(both groups under `k` would push the whole array under `2k`), so
inclusion–exclusion collapses to a clean subtraction:
`2^n − 2·F`, where `F` counts subsets with sum `< k`. That count comes
from one backward knapsack sweep restricted to rows `0 … k−1`: reading
value `v`, each row `s ≥ v` absorbs the ways of reaching `s − v`, and
values of size `k` or more never touch a row at all. If instead the
total falls short of `2k`, both groups cannot clear the bar
simultaneously and the true count of great partitions is zero.

Every stored quantity is a residue mod `10⁹ + 7`; pairwise additions of
residues stay under `2 · 10⁹`, comfortably inside JavaScript Number's
exact range (well below `2⁵³`), and 64-bit accumulators carry the same
arithmetic everywhere else.

**Complexity:** `O(n · k)` time for the knapsack sweep, `O(k)` space for
the row counts.

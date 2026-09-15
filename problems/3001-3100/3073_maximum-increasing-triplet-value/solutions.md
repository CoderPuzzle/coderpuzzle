# Solutions — Maximum Increasing Triplet Value

## Prefix and Suffix Maxima

The value `nums[i] - nums[j] + nums[k]` splits by the middle index: for a
fixed `j` it is maximized by the largest legal partner on each side, so one
sweep collecting both partners beats enumerating triplets.

The right partner is easy — an array `suffix[j]` of the maximum element from
`j` onward answers "greatest element right of `j`" outright, and that maximum
is itself the best choice whenever any valid one exists, since it exceeds
`nums[j]` exactly when some element does. The left partner must be the
greatest earlier value strictly below `nums[j]`, which is a predecessor query
on the set of values seen so far; the sweep keeps that set in a Fenwick tree
indexed by compressed rank that stores prefix maxima, so both the query and
the per-element insert cost one logarithmic walk. A candidate is scored only
when a smaller left value exists and `nums[j] < suffix[j + 1]`; the statement
guarantees at least one triplet, so the accumulator is always set. Every
triplet value stays inside `(-10⁹, 10⁹)` — it is smaller than `nums[k]` — so
32-bit arithmetic suffices throughout.

**Complexity:** `O(n log n)` time (sort plus one tree walk per element),
`O(n)` space.

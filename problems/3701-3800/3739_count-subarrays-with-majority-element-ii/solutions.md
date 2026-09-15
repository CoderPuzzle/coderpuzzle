# Solutions — Count Subarrays With Majority Element II

## Prefix scores plus a Fenwick tree

Give every element a score of +1 when it equals `target` and -1 otherwise.
A window contains `target` strictly more than half of the times exactly
when its score sum is positive — every occurrence of `target` contributes
a +1, everything else a -1, so positivity is the majority definition
restated as arithmetic. With prefix scores `pref[0] = 0` and `pref[k] =
pref[k - 1] + score(nums[k - 1])`, the sum over the subarray `(i, j]` is
`pref[j] - pref[i]`, and the whole task collapses to counting pairs
`i < j` with `pref[i] < pref[j]`: each such pair is exactly one qualifying
subarray, and each qualifying subarray is exactly one such pair.

Count those pairs in a single sweep over `pref` backed by a Fenwick tree
over the value range. Scores move the prefix one step either way, so every
prefix lies in `[-n, n]`, and an offset folds that range onto indexes
`1..2n + 1` — no coordinate compression is ever needed. Walking positions
left to right, each position first queries how many already-inserted
prefixes are strictly below `pref[k]`, adds the count to the answer, and
only then inserts `pref[k]`; querying before inserting processes every
pair once and makes `i < j` automatic. The strict comparison is
load-bearing: equal prefixes describe windows where `target` fills exactly
half the positions, which the definition refuses to call a majority.

The sweep reports `0` on its own whenever `target` is absent — every score
is -1, the prefix only descends, and no earlier prefix ever sits below a
later one. Size is the real trap: the answer climbs to `n(n + 1) / 2`,
about `5 * 10⁹` at `n = 10⁵`, well past the 32-bit range, so the
accumulator and return type must be 64-bit throughout.

**Complexity:** `O(n log n)` time, `O(n)` space.

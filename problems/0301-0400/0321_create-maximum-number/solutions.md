# Solutions — Create Maximum Number

## Pick, merge, then try every split

If it were known how many of the `k` digits come from `nums1`, the task would
fall apart into two independent pieces: choosing the best digits inside each
array, and interleaving the two choices. For one array the best length-`t`
subsequence is a greedy monotonic stack: walk the digits, and while the budget
of digits that must still be dropped is positive, pop any smaller digit that a
larger newcomer exposes in front of itself. Keeping the first `t` survivors
this way is the lexicographically largest subsequence of that length, because
every pop trades a weaker earlier digit for a stronger later one without
endangering the count.

Merging the two chosen subsequences looks like the classic merge of two sorted
runs — take the larger head — but equal heads are the trap. When the heads
tie, the choice is decided by what follows: compare the two remaining tails,
skipping their common prefix, and take from the side whose tail is larger; a
tail that runs out first loses, since its twin keeps producing digits. Head
comparison alone fails on `[6, 7]` versus `[6, 0, 7]`-style inputs: the heads
are both 6, yet the 7 that follows the first 6 must go out before the 0 does,
giving `6, 7, 6, 0, 7`. The same lookahead also settles the prefix case
`[6, 7]` versus `[6]`, where the longer tail wins the tie.

Nothing says how the `k` digits split between the arrays, so the code tries
every `take1` from `0` to `m`, pairs it with `take2 = k - take1` whenever that
fits in `nums2`, and keeps the lexicographically largest of the `k + 1`
merged candidates. Candidates all have length `k`, so a straight digit-wise
comparison picks the winner. Each split costs one stack pass over each array
plus one merge whose tie comparisons scan at most the remaining tails.

**Complexity:** `O(k^2 * (m + n))` time, `O(m + n)` space.

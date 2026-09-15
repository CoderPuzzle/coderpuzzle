# Solutions — Split Array With Same Average

## Meet-in-the-middle subset sums

If two non-empty parts of `nums` have equal averages, both averages must equal the average of the whole array, `total / n`. So the question becomes: does some proper, non-empty subset of size `s` have sum exactly `total * s / n`? Only sizes `s` where `(total * s) % n == 0` can work, which usually leaves very few candidates. Enumerating all `2^30` subsets directly is too slow, so the array is cut in half and every subset of each half is enumerated separately — at most `2^15` per half — with the sums grouped by subset size in a dictionary of sets.

The combination step walks every candidate size `s` from `1` to `n - 1`, skipping sizes whose target sum is not an integer. For each `s`, the subset is split between the halves: a left piece of size `s1` and a right piece of size `s2 = s - s1`, with `s1` clamped to the range where both pieces actually fit (`max(0, s - nr)` to `min(mid, s)`). For every sum `v` in `left[s1]`, a set membership test asks whether `target - v` exists in `right[s2]`; if so, the two pieces assemble into a valid subset and the answer is `true`.

Because `s` never reaches `n` and starts at `1`, neither the empty subset nor the full array is ever accepted, which is exactly the requirement that both `A` and `B` be non-empty. A single-element input therefore falls through every loop and returns `false`. Duplicate values cause no trouble since only sums, not identities, are tracked.

**Complexity:** `O(n · 2^(n/2))` time, `O(2^(n/2))` space.

# Solutions — Adjacent Increasing Subarrays Detection II

## Maximal increasing runs and their boundaries

The strictly increasing runs partition the array: maximal stretches where
each element exceeds its predecessor, separated by descents. Any pair of
adjacent windows that are both strictly increasing spans `2k` positions
containing no descent at all, except possibly exactly one descent — and
that descent must sit precisely between the two windows, because a window
may never contain one. So every candidate pair lives either wholly inside
one run of length `l`, forcing `k <= l // 2`, or across two consecutive
runs of lengths `p` and `c` with the first window ending the earlier run
and the second starting the later, forcing `k <= min(p, c)`.

Conversely those bounds are achievable: a run of length `l` hosts two
adjacent windows of any `k` up to `l // 2`, and a window of any `k` up to
`min(p, c)` can be slid to end exactly on the earlier run's last element,
starting the second window at the later run's first. One scan therefore
suffices: track the current run length `cur` and the previous one `prev`,
and at each descent (and once more after the loop) fold
`min(prev, cur)` and `cur // 2` into the answer. Every element is visited
once with constant work; the counters stay below `n`, far inside 32 bits.

**Complexity:** `O(n)` time, `O(1)` space, where `n = nums.length`.

# Solutions — Maximum Total Subarray Value II

## Best-first merge over monotone rows

Fixing the left endpoint `l` makes the spread monotone: widening the window
to the right can only keep or raise `max - min`, so the values of row `l` —
`nums[l..l]`, `nums[l..l+1]`, …, `nums[l..n-1]` — already sit in descending
order ending at the whole suffix. Summing the largest `k` subarray values
therefore reduces to merging `n` pre-sorted rows and taking the first `k`
elements, which is exactly what a max-heap does: seed it with every row's
largest entry `(l, n - 1)`, then pop `k` times, pushing the next cell of
that row, `(l, r - 1)`, back onto the heap whenever the popped row still
has one.

Each popped cell needs its value immediately, so arbitrary range-extrema
lookups must be constant-time. Two sparse tables deliver that: level `j`
stores the maximum (respectively minimum) of every window of length `2^j`,
and each level doubles from the previous one with a single pairwise
combine, costing an `O(n log n)` build. The spread of `nums[l..r]` is then
the larger of two overlapping length-`2^j` maxima minus the smaller of the
matching two minima, where `j = floor(log2(r - l + 1))`.

The order among tied values never matters — equal spreads contribute
equally — and the constraints guarantee at least `k` distinct cells, so the
heap never starves. Every individual spread is at most `10⁹` and at most
`10⁵` picks are made, so the total stays near `10¹⁴`: comfortably inside a
signed 64-bit accumulator, and inside the exact-integer range of
JavaScript numbers.

**Complexity:** `O((n + k) log n)` time, `O(n log n)` space.

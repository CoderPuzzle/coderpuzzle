# Solutions — Number of Ways to Select Buildings

## One scan with running subsequence counters

A valid selection is exactly a subsequence of the form 010 or 101, so the
answer is the count of those two patterns combined. Both counts can be built
in a single left-to-right pass using the standard subsequence-recurrence
counters: when a character arrives it completes every partially formed
pattern and extends every pattern of one shorter length seen so far. Seeing
a 0 finishes each 10 into a 101 (add `seq10` to the total) and turns each
previously seen 1 into a new 01 pair (add `ones` to `seq01`); seeing a 1 is
the mirror image, finishing each 01 into a 010 and turning each 0 into a new
10 pair. Two integer accumulators for the digit counts plus two for the pair
counts are the entire state.

The worst case fits comfortably in signed 64 bits: an alternating string of
length `10⁵` yields about `4.2 × 10¹³` ways, far below `2⁶³`, so fixed-width
languages return through their native 64-bit type (`long long`, `long`,
`i64`, Go's `int64`) while JavaScript's plain numbers remain exact because
`4.2 × 10¹³ < 2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.

# Solutions — Number of Longest Increasing Subsequence

## Length and count, one DP pair

The longest increasing subsequence itself is not one object here — the
question is how many there are, so every position carries a pair:
`lengths[i]` is the longest strictly increasing subsequence ending exactly
at `i`, and `counts[i]` is how many of that length end there. A subsequence
ending at `i` is a subsequence ending at some earlier `j` with
`nums[j] < nums[i]`, plus `nums[i]` itself; the strict comparison is the
whole notion of "increasing", so equal values never extend anything. When
a predecessor offers a length one beyond the running best, its count
_replaces_ the tally — everything shorter is no longer relevant — and when
it merely ties the best, its count _adds_: each maximum-length arrival at
`i` decomposes through exactly one such `j`.

Every position starts as its own length-1 subsequence with count 1, and
the answer is the total count over the positions holding the maximum
length, tallied as the sweep goes. The examples fall out directly: in
`[1, 3, 5, 4, 7]` both the 5 and the 4 hand the 7 a length-4 arrival, one
count each, for 2; in `[2, 2, 2, 2, 2]` strictness blocks every extension,
leaving five length-1 subsequences. The double loop is `n²` pair checks —
four million at the `n = 2000` ceiling.

One width caution: the statement promises only that the _answer_ fits in
32 bits. Counts at positions that never reach the maximum can tower far
past it — equal-value blocks multiply (five blocks of 396 equal values
push a dead count to `396⁵ ≈ 9.7 × 10¹²`) — so the fixed-width ports
accumulate in 64-bit registers and narrow at the return.

**Complexity:** `O(n²)` time, `O(n)` space.

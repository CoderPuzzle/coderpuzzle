# Solutions — Maximum Coins From K Consecutive Bags

## Sorted Segments, Prefix Sums, and Two Candidate Windows per Segment

The optimal window of `k` consecutive bags can always be shifted until its left end coincides with some segment's `li` or its right end with some segment'sri`: sliding a window over empty space until it clips a segment boundary never loses coins. Testing both alignments per segment — starts `li`and`ri - k + 1`— over all`n`segments therefore covers the optimum while shrinking the candidate set from`10⁹`positions to`2n`.

Evaluating one window needs the coins inside `[start, start + k - 1]`. Sort the segments by left endpoint and precompute each segment's total `ci · (ri - li + 1)` with a prefix sum over segments. A window intersects at most two segments partially and a contiguous run of segments fully, so binary searches locate the first segment whose right end reaches the window (`bisect_left` on rights) and the last whose left end falls inside (`bisect_right` on lefts, minus one); full segments in between come from the prefix sum, and the two boundary segments contribute their clipped lengths times their densities. A window missing every segment returns zero.

![Segments [1,3]x2, [5,6]x4 and [8,10]x1 with k = 4: the window ending at r = 6 collects 10, the one starting at l = 5 only 8.](figures/solution-segment-windows.svg)

Each candidate is exact because bags outside all segments hold nothing and the segments are non-overlapping — no double counting is possible when clipping partial overlaps at both ends and summing whole segments in the middle.

Edge cases: `ri - k + 1` can be negative when `k` exceeds a segment's reach to the origin; positions before 1 simply contain no coins, which the binary searches handle since no segment covers them. Very small windows fully inside one segment take the single-segment branch (`a == b`), and windows spanning no full segment get only the two clipped parts. Sorting dominates the runtime; each of the `2n` window evaluations costs two binary searches plus `O(1)` arithmetic.

**Complexity:** `O(n log n)` time, `O(n)` space.

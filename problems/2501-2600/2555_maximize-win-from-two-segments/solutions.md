# Solutions — Maximize Win From Two Segments

## Prefix-best plus suffix-best single windows over index cuts

Solve one segment first: sliding a window's right end across the sorted
array with a left pointer that never regresses yields, for every index,
the largest prize count any length-`k` window ending there can hold;
a running maximum turns those counts into `pre[c]`, the best single window
restricted to prize indices before cut `c`. Mirror scans give `suf[c]`
over indices from `c` onward.

Two facts make the cut maximization exact. Any particular selection of
two segments splits across some index cut in a way that never overstates
its own winnings — order the segments by start position; everything the
left one can cover below the right one's reach is a single-window take
inside some prefix, so it is at most `pre[c]`, and the right side is at
most `suf[c]`; monotonicity of both running maxima lets misaligned cuts
collapse onto their maximum. Conversely, placing whichever two windows
achieve `pre[c]` and `suf[c]` collects at least their restricted sums —
the sides count disjoint index ranges even if the physical segments
cross — so the scanned maximum is always attainable and never beatable.

Both direction sweeps are linear because each pointer moves only forward,
and every array cell is written once; the final pass is another linear
scan of `n + 1` split candidates. Three passes total run comfortably
within limits at the full `10⁵` cap. Counts are bounded by `n`, so all
languages use plain 32-bit integers, and the non-decreasing guarantee is
what makes the pointer logic sound: equal positions never push a window
boundary backwards.

**Complexity:** `O(n)` time, `O(n)` space.

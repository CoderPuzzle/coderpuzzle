# Solutions — Visit Array Positions to Maximize Score

## Two running best scores, one per parity

Let `best[p]` be the largest total score of any legal visit sequence that
ends at a visited position whose value has parity `p`. Every sequence starts
at position 0, so before the scan begins the state matching `nums[0]` holds
`nums[0]` and the other state holds an unseen marker. Visiting a position
makes the sequence end there, so during a left-to-right scan a new value can
only ever improve the state of its own parity — each step reads both states
but writes just one, which makes the in-place update safe without buffering.

When the scan reaches value `v = nums[i]` with parity `p`, extending a
same-parity-ending sequence adds `v` for free, while extending the opposite
state also pays `x`; `best[p]` becomes the larger of `best[p] + v` and
`best[other] + v - x`. Every value is positive, so extending always beats
skipping. The opposite state may still be unseen: keeping that marker far
below any real score (real totals stay above `-10¹¹`, the marker sits near
`-10¹⁸`) means a marker-derived candidate can never win a comparison, so no
reachability flag is needed.

After the scan the answer is the larger of `best[0]` and `best[1]`; visiting
position 0 alone is always legal, so at least one state is always real.
Totals reach `10⁵ · 10⁶ = 10¹¹`, outside 32-bit range, so the states and the
return value are 64-bit throughout.

**Complexity:** `O(n)` time, `O(1)` space.

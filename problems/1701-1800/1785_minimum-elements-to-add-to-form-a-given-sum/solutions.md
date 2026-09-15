# Solutions — Minimum Elements to Add to Form a Given Sum

## Close the gap with ceiling division

Adding one element moves the array's sum by at most `limit` in either
direction, so if the current sum misses `goal` by a gap `g`, at least
`ceil(g / limit)` additions are unavoidable — and that many always
suffice, since all but possibly the last added element can carry a full
`±limit`. The array's individual values never matter, only its total, so
the answer collapses to `ceil(abs(goal - sum(nums)) / limit)`.

The one trap is range. Summing up to `10⁵` elements of magnitude `10⁶`
reaches `10¹¹`, and the gap adds `goal`'s `10⁹` on top, so the running
sum, the gap, and the ceiling-division numerator all overflow 32-bit
integers and must be held in 64-bit ones. The answer itself is safe:
it is at most `10⁵ + 10⁹ = 1000100000`, comfortably inside 32 bits, so
only the intermediates need widening.

**Complexity:** `O(n)` time, `O(1)` space.

# Solutions — Split Array Into Maximum Number of Subarrays

## Greedily close a subarray as soon as its AND reaches zero

The AND of a segment only ever loses bits as it grows, and every
segment score is non-negative, so the sum of scores of any split is at
least the AND of the whole array — each segment's score is a supermask
of it, and the single-segment split attains exactly that value. So the
minimum possible sum is `AND(nums)`. If that minimum is nonzero, every
score in every split is a nonzero supermask of it, and k segments force
a sum of at least k times it, which is strictly worse than one
segment — the answer is 1.

When the minimum is zero, a split reaches it only if every subarray
scores zero, and the goal becomes maximizing the count of zero-AND
subarrays. Scan once, folding a running AND from the position after the
last cut, and cut the moment it becomes zero. This is optimal by an
exchange argument on cut positions: the greedy's i-th cut never sits
to the right of any valid split's i-th cut, because zero is absorbing
under AND — if a valid split cuts at position e after having cut at
position b (its segments from b+1 to e scoring zero), then starting
from any earlier cut g <= b, extending to e still ANDs that zero-AND
chunk into the running value, so e is also a valid greedy cut. Each
greedy cut is therefore at least as early, so greedy never runs out of
elements before the reference split does and finishes with at least as
many zero-AND subarrays.

Whatever remains open after the last cut cannot extend the count: a
nonzero running AND absorbs into the preceding cut segment (whose AND
is zero, keeping the merged segment at zero), or — when nothing ever
closed — the whole array is the unique minimum-sum split. Both cases
collapse to an answer of 1, so the result is the number of completed
cuts, with a floor of 1 for the always-required single subarray. The
running AND and the counter both stay far below 2³¹ (values are at
most 10⁶ and there are at most 10⁵ cuts).

**Complexity:** `O(n)` time, `O(1)` space.

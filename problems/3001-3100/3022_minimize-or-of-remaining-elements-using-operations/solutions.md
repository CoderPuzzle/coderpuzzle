# Solutions — Minimize OR of Remaining Elements Using Operations

## Greedy over segmentations, high bit first

Any sequence of operations reshapes nums into contiguous segments: every
merge ANDs two neighbors, so in the end each segment contributes a single
value, the AND of its elements, and exactly len(nums) - (number of segments)
operations were spent regardless of order. The final OR is therefore the OR
of segment ANDs, and an AND can only keep bits that every element of its
segment carries.

The solution decides the answer one bit at a time from bit 29 down to 0,
maintaining `forbidden`, the mask of bits already forced out of the answer.
Clearing more bits can never break a segmentation — an AND disjoint from a
bigger mask is disjoint from any subset — so feasibility is monotone, and
committing each higher bit whenever the extended mask stays feasible makes
`forbidden` lexicographically maximal from the top, which minimizes the
surviving OR.

Feasibility asks whether some segmentation into at least len(nums) - k
segments has ANDs all avoiding the mask, and one left-to-right pass answers
it: `groups_for` keeps the running AND of the open segment and cuts the
moment that AND becomes disjoint from the mask, since closing earliest only
leaves more elements to the segments that follow. If the array ends on a
still-dirty running AND, nothing could have cleaned that suffix, so the tail
merges into the previous segment — widening a segment only shrinks its
already-clean AND further. If not even the first segment cleans, the AND of
the whole array touches the mask and no sequence of operations can help.
The resulting cut count is the most any segmentation can achieve, so
`len(nums) - groups <= k` settles the bit.

**Complexity:** `O(30n)` time, `O(1)` space.

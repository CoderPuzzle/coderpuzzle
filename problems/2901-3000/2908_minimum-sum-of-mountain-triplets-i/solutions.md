# Solutions — Minimum Sum of Mountain Triplets I

Every mountain is identified by its peak: an index j forms a mountain
triplet exactly when some value before it and some value after it both sit
strictly below nums[j], and the cheapest triplet through j attaches the
smallest value on each side. Reading those two side minima for every peak
position settles the whole array without enumerating triplets.

## Prefix and suffix minima around each peak

Two sweeps record, for every index, the minimum value from the left edge
up to it and from it out to the right edge. For a candidate peak j the
flanking values are then read off directly as left_min[j - 1] and
right_min[j + 1], and j yields a mountain only when both are strictly
smaller than nums[j] — an equal value on either side disqualifies the
peak.

Each qualifying peak proposes the sum of its two flanking minima plus
nums[j], and the smallest proposal wins; -1 is returned when no peak ever
qualifies. Values never exceed 50, so a sum stays at most 150 and plain
32-bit integers hold everything. The two sweeps and the final scan each
touch every index once, and the two side arrays are the only extra
storage.

**Complexity:** `O(n)` time, `O(n)` space.

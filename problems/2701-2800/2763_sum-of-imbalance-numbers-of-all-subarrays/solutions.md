# Solutions — Sum of Imbalance Numbers of All Subarrays

## Presence-set sweep over each left endpoint

The imbalance number depends only on which distinct values a subarray
contains: sorting keeps equal values adjacent with gaps of zero, so repeats
never create or repair a gap larger than one between neighboring values.
That makes the counter incrementally maintainable. Anchor the left endpoint
`i`, seed the window with `nums[i]` — a single element has imbalance `0`,
because it has no adjacent pairs to test — then extend the right endpoint
one value at a time while keeping the set of values seen so far and the
running imbalance of the current window.

When the incoming value is already in the set nothing changes at all. A new
value `v` lands in one of the hint's three cases: largest so far, smallest
so far, or strictly between two old neighbors — and each case reduces to
checking whether `v - 1` and `v + 1` are present. Both present means `v`
bridges an existing gap, splitting one counted gap into two uncounted ones,
so the counter drops by one; neither present means `v` stands isolated,
creating one new counted gap against its nearest neighbor on whichever side
exists, so the counter rises by one; exactly one neighbor leaves the count
untouched. Add the counter to the total after every extension, and the sum
accumulates every subarray exactly once.

With `n <= 1000` the double loop visits under half a million windows, each
doing constant work against a boolean presence array sized to the value
range, so the quadratic sweep sits comfortably inside the limits.

**Complexity:** `O(n²)` time, `O(n)` space.

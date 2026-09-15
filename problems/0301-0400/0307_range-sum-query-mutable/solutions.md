# Solutions — Range Sum Query - Mutable

## Fenwick Tree (Binary Indexed Tree)

A prefix-sum array answers range sums in constant time but breaks under updates — one changed element invalidates every prefix from that index on. The `NumArray` class instead builds a Fenwick tree, an array where 1-based position `i` stores the sum of the block of length `i & (-i)` (the value of `i`'s lowest set bit) ending at `i`. These blocks overlap in a way that both directions of traversal touch only `O(log n)` of them.

Both operations reduce to walking the low bit. A prefix sum of the first `count` elements follows `count -= count & -count`, each step landing on a disjoint block whose union is exactly the prefix; `sumRange(left, right)` is the difference `prefix(right + 1) - prefix(left)`. An `update` applies only the _delta_ `val - nums[index]` (the class keeps a copy of the current values so the next delta is computed correctly) and climbs `position += position & -position` from the changed cell to every block that contains it, adding the delta at each.

Construction runs in linear time rather than `n` updates: for each index the accumulated block sum is pushed directly into its parent's slot, so the whole tree is assembled in one pass. The tree is 1-indexed with slot 0 unused, which is what makes the low-bit arithmetic valid; a zero index would loop forever since `0 & -0` is 0.

Both the Python and Java canonical solutions implement exactly this structure (the Java version accumulates into `long` to be safe with sums, though values here cannot overflow 32 bits). With `n ≤ 3 · 10⁴` and `5 · 10⁴` mixed calls, each `update` and `sumRange` costing logarithmic time keeps the whole workload small, satisfying the follow-up.

**Complexity:** `O(log n)` time per `update`/`sumRange` with an `O(n)` build, `O(n)` space.

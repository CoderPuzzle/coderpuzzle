# Solutions — Wiggle Sort

## One pass, swap each violation

The wiggle condition is purely local: each adjacent pair demands its own
relation — `nums[i-1] <= nums[i]` at odd `i`, `nums[i-1] >= nums[i]` at even
`i` — and two neighboring pairs share only the single element between them.
That is enough for one left-to-right pass: examine every pair once, and when
a pair breaks its demanded relation, swap the two elements in place.

The swap is safe precisely because a violated relation is a strict one. When
odd `i` is violated, `nums[i-1] > nums[i]`, so the swap moves the smaller
value to `i-1` and repairs the pair outright — and because the pair before it
held `nums[i-2] >= nums[i-1]` against a value that was itself greater than
`nums[i]`, the newcomer at `i-1` sits strictly below its left neighbor.
Repairing one pair can therefore never re-break the previous one; the
even-`i` case is the mirror image, and a pair that already satisfies its
relation is left untouched.

Every element is examined once and a violation costs one swap, so the whole
reorder is a single pass with no extra storage — which also answers the
follow-up. No sorting is needed, and on this bundle's wire the reordered
array is the return value as well: the in-place mutation is itself the
answer carried back out.

**Complexity:** `O(n)` time, `O(1)` space.

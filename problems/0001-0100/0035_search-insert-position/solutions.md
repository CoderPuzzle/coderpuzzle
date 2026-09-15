# Solutions — Search Insert Position

## Lower-bound bisection

Present or absent, `target` asks the same question: where is the leftmost index whose value is at least `target`? When the value is found, that index is its position; when it is not, it is exactly the slot the value would occupy for the array to stay sorted. The two halves of the statement therefore share one answer — the lower bound — and the guarantee of distinct ascending values makes the predicate monotone across the array, false then true, which is precisely the shape bisection needs.

The method tracks the half-open range `[lo, hi]`, starting as the whole array, under a single invariant: everything left of `lo` is below `target`, everything from `hi` onward is at least `target`. Each iteration probes the midpoint with the one comparison `nums[mid] < target` — a too-small value proves the answer sits strictly right of `mid`, anything else keeps `mid` a live candidate — and discards half the range. When `lo` and `hi` meet they have squeezed out everything except the answer, `len(nums)` included for a `target` above every element, as in Example 3.

There is no equality branch to get wrong because equality folds into the keep-`mid` side of the single comparison, and the halving itself delivers what the statement demands: even the maximum 10⁴-element array settles in at most fourteen probes, with no state beyond two indices.

**Complexity:** `O(log n)` time, `O(1)` space.

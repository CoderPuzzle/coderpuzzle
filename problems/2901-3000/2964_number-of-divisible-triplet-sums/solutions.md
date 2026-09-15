# Solutions — Number of Divisible Triplet Sums

Whether a triplet sum is divisible by d depends only on the three elements'
remainders modulo d, so the search never needs the values themselves — just
how many earlier elements carry each remainder.

## Fix the left end, sweep a remainder map between L and R

Fix the leftmost index L of the triplet and sweep a second index R rightward
from L + 1, maintaining a map from remainder to count over the elements
strictly between L and R. When the sweep stands at R, the sum
nums[L] + nums[R] leaves a remainder of (nums[L] + nums[R]) % d, so any
third element between them completes a divisible triplet exactly when its
remainder is (-nums[L] - nums[R]) mod d — one map lookup adds every such
middle element at once. Each triplet (L, middle, R) with L < middle < R is
counted exactly once, at L = its leftmost index and R = its rightmost, so
summing over all L counts every qualifying triplet precisely one time.

The double sweep touches each (L, R) pair once for O(n²) work, and the map
holds at most min(n, d) distinct remainders. Two-element sums reach 2 × 10⁹,
so the remainder arithmetic is done in 64-bit integers (exactly representable
in JavaScript's doubles, far under 2⁵³); the answer itself is bounded by
C(1000, 3) ≈ 1.7 × 10⁸ and fits in 32 bits.

**Complexity:** `O(n²)` time, `O(n)` space.

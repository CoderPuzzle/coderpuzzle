# Solutions — Maximum Subsequence Score

## Sort by nums2 with a Min-Heap of Size k

The score multiplies the sum of chosen `nums1` values by the minimum of the chosen `nums2` values, and the minimum is the hard part to control. The trick is to enumerate which element _provides_ that minimum: sort the `(nums2, nums1)` pairs in descending order of `nums2` and sweep, so when the loop is at pair `(b, a)`, every pair already considered has `nums2 >= b`. If `b` is the minimum of the chosen set, the optimal companions are simply the `k - 1` largest `nums1` values among the pairs seen so far.

Maintaining "the k largest seen so far" while the sweep advances is exactly a min-heap of size `k` with a running sum: push each arriving `a`, and whenever the heap exceeds `k`, the current smallest is ejected and subtracted, keeping the top-`k` sum correct in O(log k) per element. Once the heap holds exactly `k` elements, `total * b` is the best score achievable under the assumption that `b` is the minimum, and the answer is the maximum of these candidates over the whole sweep.

Ties in `nums2` need no special handling — when several pairs share the minimum value, whichever of them the sweep processes last still sees all others in the heap, so the best companion set is evaluated at least once. The heap never reaches size `k` only if `k > n`, which the constraints exclude, and `best` initialized to 0 is overwritten on the k-th step since scores are non-negative. Sorting dominates at O(n log n) versus O(n log k) for the heap operations.

**Complexity:** `O(n log n)` time, `O(n)` space.

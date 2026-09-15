# Solutions — Kth Smallest Product of Two Sorted Arrays

## Binary Search on the Value with Sign-Aware Counting

The rank of a candidate value `v` — the number of pairs `(i, j)` with `nums1[i] * nums2[j] <= v` — is non-decreasing in `v`, so the kth smallest product is the smallest `v` whose rank reaches `k`. Binary search runs over the whole achievable product range (products lie within about `±10^10`), and each probe counts pairs with products at most `v`. Because the kth product is attained by an actual pair, the search converges to it exactly even though it never enumerates products.

The counting pass exploits that `nums2` is sorted: for each `x` in `nums1`, the valid `y` form a contiguous suffix or prefix of `nums2`, found by one binary search. The sign of `x` decides which. For `x > 0`, `x * y <= v` means `y <= floor(v / x)`, so the count is the number of elements at most that bound (`bisect_right`). For `x < 0`, dividing flips the inequality to `y >= ceil(v / x)`, so the count is the length of the array minus the elements strictly below that bound, with a careful ceiling-division helper correct for negative operands under Python's floored division. For `x == 0`, every product is 0, so all `len(nums2)` pairs count exactly when `v >= 0`.

The counting pass over `m = len(nums1)` elements costs `O(m log n)` per probe, with `n = len(nums2)`, and about `log V` probes are needed, where `V` (roughly `4 * 10^10`) is the span of achievable product values. All-zero arrays, mixed signs, and duplicates fall out of the same three-way branch with no further cases.

**Complexity:** `O(m log n log V)` time, `O(1)` space.

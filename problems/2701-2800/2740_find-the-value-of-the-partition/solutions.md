# Solutions — Find the Value of the Partition

## Sort and Scan Adjacent Gaps

Read any partition's value carefully: it is the distance between two specific elements, the maximum of `nums1` and the minimum of `nums2`, which sit on opposite sides. Those two values exist somewhere in `nums`, so a partition can never score better than the closest pair of values anywhere in the array. The answer therefore has a floor: the smallest distance between any two elements of `nums`.

Sorting shows that floor is always reachable. In sorted order the closest pair of values sits in adjacent positions, and splitting there — every element up to and including the left one into `nums1`, everything after it into `nums2` — makes `max(nums1)` and `min(nums2)` exactly that pair, since sorted order pins each side's boundary to the split point. So the answer is simply the minimum of `nums[i] - nums[i - 1]` over the sorted array, read off in one linear pass.

Two shapes sharpen the intuition. Duplicate values make some adjacent gap zero, so any repeated value forces the answer to `0` — place copies on opposite sides. And the optimal sides need not be contiguous in the input's original order at all: in `[100, 1, 10]` the winning partition keeps `10` alone against `[100, 1]`, yet after sorting the same rule reads off the single tight gap `10 - 1`. Sorting absorbs the input ordering entirely; only adjacent value distances matter.

**Complexity:** `O(n log n)` time, `O(n)` space.

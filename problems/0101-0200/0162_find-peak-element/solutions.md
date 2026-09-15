# Solutions — Find Peak Element

## Linear Scan for the First Descent

Because adjacent elements are never equal, the leftmost peak has a crisp characterization: it is the first index i with `nums[i] > nums[i + 1]`. Every earlier index lies on a strictly ascending prefix, so such an i beats its left neighbor by the climb and its right neighbor by definition — and positions just outside the array count as -infinity, so index 0 and index n - 1 can qualify through their inner neighbor alone.

The scan tests each index in order with two boundary-aware checks — `i == 0 or nums[i] > nums[i - 1]` and `i == n - 1 or nums[i] > nums[i + 1]` — and returns the first index passing both, which is exactly the leftmost guarantee. If the whole array strictly ascends there is no descent anywhere; the loop then reaches the last index, which passes the right check vacuously and the left check strictly. The trailing -1 is unreachable, since some peak always exists.

The linearity is deliberate: the classic binary search finds a peak in O(log n), but which peak it lands on depends on the probe positions, so it cannot be relied upon to return the leftmost one. A left-to-right pass that stops at the first descent is the direct and always-correct way to meet this problem's specification.

**Complexity:** `O(n)` time, `O(1)` space.

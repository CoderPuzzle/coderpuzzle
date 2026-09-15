class Solution {

    public int[] searchRange(int[] nums, int target) {
        // The run of targets starts at the first index >= target...
        int start = lowerBound(nums, target);
        if (start == nums.length || nums[start] != target) {
            return new int[] { -1, -1 };
        }
        // ...and ends one slot before the first index >= target + 1: the
        // upper bound of target is exactly the lower bound of target + 1.
        return new int[] { start, lowerBound(nums, target + 1L) - 1 };
    }

    // Smallest index whose value is >= limit; nums.length if none. The kept
    // half always contains that boundary, so the window halves until only the
    // boundary is left. The limit is a long because target + 1 can be one
    // past the 32-bit maximum.
    private int lowerBound(int[] nums, long limit) {
        int lo = 0,
            hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] < limit) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}

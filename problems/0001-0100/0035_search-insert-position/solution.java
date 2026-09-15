class Solution {

    public int searchInsert(int[] nums, int target) {
        // Lower bound over the half-open range [lo, hi): the first index whose
        // value is >= target. Present or absent, that index is the answer.
        int lo = 0,
            hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) {
                // Too small: the answer sits strictly right of mid.
                lo = mid + 1;
            } else {
                // nums[mid] >= target keeps mid a live candidate.
                hi = mid;
            }
        }
        return lo;
    }
}

class Solution {

    public int missingElement(int[] nums, int k) {
        int n = nums.length;
        // A gapless array would have nums[i] = nums[0] + i, so `last` counts
        // the values absent before the final element; the count is
        // non-decreasing in i.
        int last = nums[n - 1] - nums[0] - (n - 1);
        // Whole array holds fewer than k missing numbers: answer lies beyond
        // the last element.
        if (last < k) {
            return nums[n - 1] + (k - last);
        }
        // First index whose missing count reaches k; missing(0) = 0 < k keeps
        // lo >= 1, so lo - 1 is always valid.
        int lo = 0,
            hi = n - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] - nums[0] - mid >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        // The kth missing number sits in the gap right after nums[lo-1].
        int prevMissing = nums[lo - 1] - nums[0] - (lo - 1);
        return nums[lo - 1] + (k - prevMissing);
    }
}

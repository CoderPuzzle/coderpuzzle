class Solution {

    public int kthSmallestSubarraySum(int[] nums, int k) {
        long lo = Long.MAX_VALUE,
            hi = 0;
        for (int value : nums) {
            lo = Math.min(lo, value);
            hi += value;
        }
        // lo/hi now bracket the answer over [min element, total sum]: f is
        // non-decreasing and jumps only at real subarray sums, so the smallest x
        // with f(x) >= k IS the k-th smallest sum.
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (countAtMost(nums, mid) >= k) hi = mid;
            else lo = mid + 1;
        }
        return (int) lo;
    }

    // f(x) = number of subarrays with sum <= x. Sliding window: positivity
    // guarantees shrinking monotonically reduces the sum.
    private long countAtMost(int[] nums, long limit) {
        long total = 0;
        long windowSum = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum > limit) {
                windowSum -= nums[left];
                left++;
            }
            // Subarrays ending at `right` that fit: exactly the window's length.
            total += right - left + 1;
        }
        return total;
    }
}

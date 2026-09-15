class Solution {

    public long maximumTripletValue(int[] nums) {
        int n = nums.length;
        // prefix_max[i] is the largest value at or before i, suffix_max[i] the
        // largest value at or after i, so any middle index j can look both ways.
        long[] prefixMax = new long[n];
        long[] suffixMax = new long[n];
        prefixMax[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
        }
        suffixMax[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            suffixMax[i] = Math.max(suffixMax[i + 1], nums[i]);
        }

        // For a fixed middle j the best choice of i < j is prefixMax[j - 1] and
        // of k > j is suffixMax[j + 1]; the clamp keeps an all-negative answer
        // at 0. The product reaches ~10^12, past 32-bit range.
        long ans = 0;
        for (int j = 1; j + 1 < n; ++j) {
            ans = Math.max(ans, (prefixMax[j - 1] - nums[j]) * suffixMax[j + 1]);
        }
        return ans;
    }
}

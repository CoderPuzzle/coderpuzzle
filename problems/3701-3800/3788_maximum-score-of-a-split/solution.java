class Solution {

    public long maximumScore(int[] nums) {
        int n = nums.length;
        // The running prefix sum reaches n * 10^9 = 10^14, well past 32
        // bits, so it accumulates in a 64-bit integer even though each
        // element fits.
        long p = 0;
        for (int value : nums) {
            p += value;
        }
        // Sweep the split indices right to left carrying two running views:
        // p holds prefixSum(i) and suffixMin holds the minimum of
        // nums[i + 1..n - 1]. The last valid split seeds the answer.
        p -= nums[n - 1];
        int suffixMin = nums[n - 1];
        long best = p - suffixMin;
        for (int i = n - 3; i >= 0; i--) {
            // Moving to split i folds nums[i + 1] into both views.
            suffixMin = Math.min(suffixMin, nums[i + 1]);
            p -= nums[i + 1];
            long score = p - suffixMin;
            if (score > best) {
                best = score;
            }
        }
        return best;
    }
}

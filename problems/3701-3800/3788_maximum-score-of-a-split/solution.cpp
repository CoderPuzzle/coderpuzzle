class Solution {
  public:
    long long maximumScore(vector<int> &nums) {
        int n = nums.size();
        // The running prefix sum reaches n * 10^9 = 10^14, well past 32
        // bits, so it accumulates in a 64-bit integer even though each
        // element fits.
        long long p = 0;
        for (int value : nums) {
            p += value;
        }
        // Sweep the split indices right to left carrying two running views:
        // p holds prefixSum(i) and suffix_min holds the minimum of
        // nums[i + 1..n - 1]. The last valid split seeds the answer.
        p -= nums[n - 1];
        int suffix_min = nums[n - 1];
        long long best = p - suffix_min;
        for (int i = n - 3; i >= 0; i--) {
            // Moving to split i folds nums[i + 1] into both views.
            suffix_min = min(suffix_min, nums[i + 1]);
            p -= nums[i + 1];
            long long score = p - suffix_min;
            if (score > best) {
                best = score;
            }
        }
        return best;
    }
};

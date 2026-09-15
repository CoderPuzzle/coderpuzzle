class Solution {
  public:
    long long maximumTripletValue(vector<int> &nums) {
        int n = nums.size();
        // prefix_max[i] is the largest value at or before i, suffix_max[i] the
        // largest value at or after i, so any middle index j can look both ways.
        vector<long long> prefix_max(n), suffix_max(n);
        prefix_max[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            prefix_max[i] = max(prefix_max[i - 1], (long long)nums[i]);
        }
        suffix_max[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            suffix_max[i] = max(suffix_max[i + 1], (long long)nums[i]);
        }

        // For a fixed middle j the best choice of i < j is prefix_max[j - 1]
        // and of k > j is suffix_max[j + 1]; the clamp keeps an all-negative
        // answer at 0. The product reaches ~10^12, past 32-bit range.
        long long ans = 0;
        for (int j = 1; j + 1 < n; ++j) {
            ans = max(ans, (prefix_max[j - 1] - nums[j]) * suffix_max[j + 1]);
        }
        return ans;
    }
};

class Solution {
  public:
    int minArrayLength(vector<int> &nums, int k) {
        // A zero merges with anything (0 * y = 0 <= k), so it drags the
        // whole array down to a single element.
        for (int v : nums)
            if (v == 0)
                return 1;
        // Merge adjacent ones (1 * 1 = 1 <= k) so no two neighbors are
        // both 1; every remaining pair then multiplies to at least 2,
        // which bounds each backward scan by 2 * log2(k).
        vector<int> b;
        b.reserve(nums.size());
        for (int v : nums)
            if (v != 1 || b.empty() || b.back() != 1)
                b.push_back(v);
        int m = b.size();
        vector<int> dp(m + 1, 0);
        for (int i = 1; i <= m; ++i) {
            dp[i] = dp[i - 1] + 1;
            // Walk left multiplying while the merged product stays <= k:
            // each surviving j is the block b[j-1..i-1] merged to one
            // spot. Products reach k * 1e9, so the product is 64-bit.
            long long prod = 1;
            for (int j = i; j >= 1; --j) {
                prod *= b[j - 1];
                if (prod > k)
                    break;
                if (dp[j - 1] + 1 < dp[i])
                    dp[i] = dp[j - 1] + 1;
            }
        }
        return dp[m];
    }
};

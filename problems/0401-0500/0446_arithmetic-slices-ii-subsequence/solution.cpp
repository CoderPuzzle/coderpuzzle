class Solution {
  public:
    int numberOfArithmeticSlices(vector<int> &nums) {
        int n = (int)nums.size();
        // dp[i][d] = number of arithmetic subsequences of length >= 2 ending
        // at i with common difference d. Hashing per (index, difference)
        // absorbs the huge, possibly negative differences.
        vector<unordered_map<long long, long long>> dp(n);
        long long total = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long long d = (long long)nums[i] - (long long)nums[j];
                long long cnt = 0;
                auto it = dp[j].find(d);
                if (it != dp[j].end()) {
                    cnt = it->second;
                }
                // Each length >= 2 subsequence ending at j extends by nums[i]
                // into a slice of length >= 3, counted once at its last
                // element.
                total += cnt;
                // cnt extensions plus the new length-2 pair (j, i) itself;
                // pairs of exactly length 2 reach the total only via
                // extension.
                dp[i][d] += cnt + 1;
            }
        }
        return (int)total;
    }
};

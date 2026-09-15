class Solution {
  public:
    int maxScore(vector<int> &nums) {
        // dp[mask] is the best score once exactly the elements of mask have
        // been removed; the next operation is popcount(mask) / 2 + 1 and
        // pairs any two still-present elements. Ascending mask order works
        // because transitions only set bits, and the growing multiplier is
        // why the richest pair often belongs to the last operation, not the
        // first. Totals stay below 28 * 10^6, inside 32-bit range.
        int m = nums.size();
        vector<vector<int>> g(m, vector<int>(m, 0));
        for (int i = 0; i < m; ++i) {
            for (int j = i + 1; j < m; ++j) {
                g[i][j] = g[j][i] = gcd(nums[i], nums[j]);
            }
        }
        int size = 1 << m;
        vector<int> dp(size, 0);
        for (int mask = 0; mask < size; ++mask) {
            int k = __builtin_popcount(mask) / 2 + 1;
            int base = dp[mask];
            for (int i = 0; i < m; ++i) {
                if (mask >> i & 1)
                    continue;
                for (int j = i + 1; j < m; ++j) {
                    if (mask >> j & 1)
                        continue;
                    int cand = base + k * g[i][j];
                    int next = mask | 1 << i | 1 << j;
                    if (cand > dp[next])
                        dp[next] = cand;
                }
            }
        }
        return dp[size - 1];
    }
};

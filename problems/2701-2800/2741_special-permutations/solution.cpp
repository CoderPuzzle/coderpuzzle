class Solution {
  public:
    int specialPerm(vector<int> &nums) {
        const int MOD = 1000000007;
        int n = nums.size();
        int size = 1 << n;
        // dp[mask][last]: ways to arrange exactly the indices in `mask`,
        // ending with `last`, every adjacent pair already compatible.
        // n <= 14 keeps the 2^n * n table small. Increasing mask order
        // finalizes each state before it propagates.
        vector<vector<int>> dp(size, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            dp[1 << i][i] = 1;
        }
        for (int mask = 0; mask < size; mask++) {
            for (int last = 0; last < n; last++) {
                if (!((mask >> last) & 1)) {
                    continue;
                }
                int ways = dp[mask][last];
                if (ways == 0) {
                    continue;
                }
                for (int nxt = 0; nxt < n; nxt++) {
                    if ((mask >> nxt) & 1) {
                        continue;
                    }
                    // Push forward: append any unused index whose value
                    // divides nums[last] or is divided by it (checked
                    // symmetrically). Every special permutation decomposes
                    // uniquely into such steps, so none is double-counted.
                    if (nums[last] % nums[nxt] == 0 || nums[nxt] % nums[last] == 0) {
                        auto &t = dp[mask | (1 << nxt)];
                        t[nxt] = (t[nxt] + ways) % MOD;
                    }
                }
            }
        }
        int total = 0;
        for (int i = 0; i < n; i++) {
            total = (total + dp[size - 1][i]) % MOD;
        }
        return total;
    }
};

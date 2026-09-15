class Solution {
  public:
    int minXor(vector<int> &nums, int k) {
        // dp over prefixes: dp[j][i] = smallest achievable "maximum part
        // XOR" splitting the first i elements into j parts. The last part
        // of an optimal split is nums[t..i-1], whose XOR is
        // pre[i] ^ pre[t], so dp[j][i] = min over t of
        // max(dp[j-1][t], pre[i] ^ pre[t]).
        // Rows roll: prev is dp[j-1], cur becomes dp[j].
        int n = (int)nums.size();
        vector<int> pre(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            pre[i + 1] = pre[i] ^ nums[i];
        }

        const int BIG = INT_MAX;
        vector<int> prev = pre; // dp[1][i] = XOR of the whole prefix — the only split
        for (int j = 2; j <= k; ++j) {
            vector<int> cur(n + 1, BIG);
            for (int i = j; i <= n; ++i) {
                int pi = pre[i];
                int best = BIG;
                for (int t = j - 1; t < i; ++t) {
                    best = min(best, max(prev[t], pi ^ pre[t]));
                }
                cur[i] = best;
            }
            prev = move(cur);
        }
        return prev[n];
    }
};

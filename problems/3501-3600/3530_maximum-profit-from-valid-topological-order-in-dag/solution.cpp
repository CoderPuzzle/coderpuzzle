class Solution {
  public:
    int maxProfit(int n, vector<vector<int>> &edges, vector<int> &score) {
        vector<int> pred(n, 0);
        for (auto &e : edges) {
            pred[e[1]] |= 1 << e[0];
        }

        int full = (1 << n) - 1;
        vector<int> dp(1 << n, -1);
        dp[0] = 0;

        for (int mask = 0; mask <= full; mask++) {
            int cur = dp[mask];
            if (cur < 0)
                continue;
            int pos = __builtin_popcount(mask) + 1;
            int remaining = full ^ mask;
            while (remaining) {
                int bit = remaining & -remaining;
                int node = __builtin_ctz(bit);
                if ((pred[node] & mask) == pred[node]) {
                    int nm = mask | bit;
                    int val = cur + score[node] * pos;
                    if (val > dp[nm])
                        dp[nm] = val;
                }
                remaining -= bit;
            }
        }
        return dp[full];
    }
};

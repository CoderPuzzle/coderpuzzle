class Solution {
  public:
    // dp[k][j]: best total reaching the current cell having used at most k
    // of the 2 neutralizations. Rows update in place (the left neighbor is
    // already fresh), so the cell above is snapshotted first.
    int maximumAmount(vector<vector<int>> &coins) {
        const int NEG = -1000000000;
        const int rows = coins.size(), cols = coins[0].size();
        vector<int> dp0(cols, NEG), dp1(cols, NEG), dp2(cols, NEG);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                int value = coins[i][j];
                if (i == 0 && j == 0) {
                    dp0[0] = value;
                    dp1[0] = dp2[0] = max(value, 0);
                    continue;
                }
                int up0 = dp0[j], up1 = dp1[j], up2 = dp2[j];
                int left0 = j > 0 ? dp0[j - 1] : NEG;
                int left1 = j > 0 ? dp1[j - 1] : NEG;
                int left2 = j > 0 ? dp2[j - 1] : NEG;
                int best0 = max(up0, left0);
                int best1 = max(up1, left1);
                int best2 = max(up2, left2);
                dp0[j] = best0 + value;
                // A neutralization (worth it only on a robber) adds 0 here
                // and enters from a neighbor's k-1 layer.
                if (value < 0) {
                    dp1[j] = max(best1 + value, best0);
                    dp2[j] = max(best2 + value, best1);
                } else {
                    dp1[j] = best1 + value;
                    dp2[j] = best2 + value;
                }
            }
        }
        return max({dp0[cols - 1], dp1[cols - 1], dp2[cols - 1]});
    }
};

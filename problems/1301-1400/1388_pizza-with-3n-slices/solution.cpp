class Solution {
  public:
    int maxSizeSlices(vector<int> &slices) {
        int k = (int)slices.size() / 3;

        // dp[i][j] = best value using the first i entries, picking exactly j,
        // with no two chosen adjacent.
        auto rob = [](const vector<int> &arr, int picks) {
            int length = (int)arr.size();
            vector<vector<int>> dp(length + 1, vector<int>(picks + 1, -1));
            dp[0][0] = 0;
            for (int i = 1; i <= length; i++) {
                for (int j = 0; j <= picks; j++) {
                    dp[i][j] = dp[i - 1][j];
                    if (j >= 1) {
                        int base;
                        if (i >= 2) {
                            base = dp[i - 2][j - 1];
                        } else {
                            base = (j == 1) ? 0 : -1;
                        }
                        if (base >= 0 && base + arr[i - 1] > dp[i][j]) {
                            dp[i][j] = base + arr[i - 1];
                        }
                    }
                }
            }
            return dp[length][picks];
        };

        if ((int)slices.size() == 1)
            return slices[0];
        vector<int> withoutLast(slices.begin(), slices.end() - 1);
        vector<int> withoutFirst(slices.begin() + 1, slices.end());
        return max(rob(withoutLast, k), rob(withoutFirst, k));
    }
};

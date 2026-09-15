class Solution {
  public:
    int maxCoins(vector<int> &nums) {
        // Pad with virtual 1s so bursts at the boundary need no special casing.
        int m = (int)nums.size() + 2;
        vector<long long> padded(m, 1);
        for (int i = 0; i < (int)nums.size(); i++) {
            padded[i + 1] = nums[i];
        }
        vector<vector<long long>> dp(m, vector<long long>(m, 0));
        // Fill by increasing interval length so both subintervals of a cell
        // are already solved when it is needed.
        for (int length = 1; length < m - 1; length++) {
            for (int left = 1; left < m - length; left++) {
                int right = left + length - 1;
                // Try each k as the LAST burst in the open interval (left, right):
                // at that moment its neighbors are the fixed boundaries.
                for (int k = left; k <= right; k++) {
                    long long coins =
                        padded[left - 1] * padded[k] * padded[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                    if (coins > dp[left][right]) {
                        dp[left][right] = coins;
                    }
                }
            }
        }
        // Everything strictly between the two padding 1s.
        return (int)dp[1][m - 2];
    }
};

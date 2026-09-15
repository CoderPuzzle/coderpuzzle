#include <algorithm>
#include <climits>
#include <vector>

class Solution {
  public:
    int maxDotProduct(std::vector<int> &nums1, std::vector<int> &nums2) {
        int n = (int)nums1.size();
        int m = (int)nums2.size();
        std::vector<std::vector<int>> dp(n + 1, std::vector<int>(m + 1, INT_MIN));
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                int pair = nums1[i] * nums2[j];
                int tail = dp[i + 1][j + 1];
                long long withPair = (long long)pair + std::max(tail, 0);
                long long best = std::max({withPair, (long long)dp[i + 1][j], (long long)dp[i][j + 1]});
                dp[i][j] = (int)best;
            }
        }
        return dp[0][0];
    }
};

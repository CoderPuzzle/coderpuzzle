#include <string>
#include <vector>

class Solution {
  public:
    std::string largestNumber(std::vector<int> &cost, int target) {
        std::vector<int> dp(target + 1, -1);
        dp[0] = 0;
        for (int t = 1; t <= target; t++) {
            for (int c : cost) {
                if (c <= t && dp[t - c] != -1 && dp[t - c] + 1 > dp[t]) {
                    dp[t] = dp[t - c] + 1;
                }
            }
        }
        if (dp[target] == -1) {
            return "0";
        }
        std::string result;
        int remaining = target;
        while (remaining > 0) {
            for (int digit = 9; digit >= 1; digit--) {
                int c = cost[digit - 1];
                if (c <= remaining && dp[remaining - c] == dp[remaining] - 1) {
                    result.push_back('0' + digit);
                    remaining -= c;
                    break;
                }
            }
        }
        return result;
    }
};

#include <string>
#include <vector>

class Solution {
  public:
    int numberOfArrays(std::string s, long long k) {
        const long long MOD = 1'000'000'007LL;
        int n = (int)s.size();
        int maxLen = (int)std::to_string(k).size();
        std::vector<int> dp(n + 1, 0);
        dp[n] = 1;
        for (int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                continue;
            }
            long long total = 0;
            long long value = 0;
            int limit = std::min(maxLen, n - i);
            for (int len = 1; len <= limit; len++) {
                value = value * 10 + (s[i + len - 1] - '0');
                if (value > k) {
                    break;
                }
                total = (total + dp[i + len]) % MOD;
            }
            dp[i] = (int)total;
        }
        return dp[0];
    }
};

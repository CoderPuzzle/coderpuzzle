class Solution {
  public:
    int countTexts(string pressedKeys) {
        const long long MOD = 1000000007LL;
        int n = pressedKeys.size();
        std::vector<long long> dp(n + 1, 0);
        dp[0] = 1;
        int i = 0;
        while (i < n) {
            char ch = pressedKeys[i];
            int max_press = (ch == '7' || ch == '9') ? 4 : 3;
            int j = i;
            while (j < n && pressedKeys[j] == ch) {
                j++;
            }
            for (int p = i; p < j; p++) {
                long long total = 0;
                for (int q = p; q >= i && p - q < max_press; q--) {
                    total = (total + dp[q]) % MOD;
                }
                dp[p + 1] = total;
            }
            i = j;
        }
        return static_cast<int>(dp[n]);
    }
};

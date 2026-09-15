class Solution {
  public:
    int minimumSubstringsInPartition(string s) {
        // dp[i] = fewest balanced pieces covering the first i characters.
        // Extending a candidate start leftwards one letter at a time keeps
        // its counts in an array while tracking how many letters are live
        // and the largest count seen; the window is balanced exactly when
        // live * largest equals its length, which makes each dp[i] one
        // backwards sweep away.
        int n = (int)s.size();
        constexpr int kInf = INT_MAX;
        vector<int> dp(n + 1, kInf);
        dp[0] = 0;
        for (int i = 1; i <= n; ++i) {
            array<int, 26> counts{};
            int live = 0;
            int top = 0;
            for (int right = i - 1; right >= 0; --right) {
                int b = s[right] - 'a';
                if (counts[b] == 0) {
                    ++live;
                }
                ++counts[b];
                if (counts[b] > top) {
                    top = counts[b];
                }
                if (live * top == i - right && dp[right] + 1 < dp[i]) {
                    dp[i] = dp[right] + 1;
                }
            }
        }
        return dp[n];
    }
};

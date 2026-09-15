class Solution {
  public:
    int numWays(vector<string> &words, string target) {
        const long long MOD = 1000000007;
        int width = (int)words[0].size();
        int n = (int)target.size();
        // Fewer columns than target characters: no strictly increasing
        // sequence of that length exists.
        if (n > width)
            return 0;

        // charCount[k][c]: how many rows have letter c at column k.
        vector<array<int, 26>> charCount(width);
        for (auto &row : charCount)
            row.fill(0);
        for (auto &word : words)
            for (int k = 0; k < width; k++)
                charCount[k][word[k] - 'a']++;

        // dp[i]: ways to have placed the first i target characters using the
        // columns considered so far. Rolled forward one column at a time.
        vector<long long> dp(n + 1, 0);
        dp[0] = 1;
        for (int k = 0; k < width; k++) {
            // Walk i downward so dp[i - 1] still reflects the previous
            // column's value when it feeds dp[i] this round -- the usual
            // rolling-knapsack update order.
            for (int i = n; i >= 1; i--) {
                int need = target[i - 1] - 'a';
                dp[i] = (dp[i] + dp[i - 1] * charCount[k][need]) % MOD;
            }
        }
        return (int)dp[n];
    }
};

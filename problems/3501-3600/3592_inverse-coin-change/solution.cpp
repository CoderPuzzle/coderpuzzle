class Solution {
  public:
    vector<int> findCoins(vector<int> &numWays) {
        // numWays[i] only depends on coins <= i, so scanning amounts in
        // ascending order the coin set is forced: maintain dp = unbounded
        // knapsack way-counts over the coins confirmed so far (dp[0] = 1).
        // Every dp[s] counts multisets of coins summing to s <= n <= 100, so
        // it never exceeds p(100) = 190569292 and int is safe.
        int n = numWays.size();
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        vector<int> coins;
        for (int i = 1; i <= n; ++i) {
            int target = numWays[i - 1];
            // If the counts already match, coin i cannot exist: adding it
            // would lift the count to dp[i] + 1.
            if (dp[i] == target)
                continue;
            // One short means coin i must exist: it contributes dp[0] = 1
            // extra way to amount i. Fold it into the running DP.
            if (dp[i] + 1 != target)
                return {};
            coins.push_back(i);
            for (int s = i; s <= n; ++s)
                dp[s] += dp[s - i];
        }
        return coins;
    }
};

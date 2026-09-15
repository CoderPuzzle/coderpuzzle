class Solution {

    public int coinChange(int[] coins, int amount) {
        // dp[a] = fewest coins for amount a; dp[0] = 0, every other amount
        // starts unreachable (INF doubles as the no-solution marker).
        final int INF = Integer.MAX_VALUE;
        int[] dp = new int[amount + 1];
        dp[0] = 0;
        for (int a = 1; a <= amount; ++a) dp[a] = INF;
        // Amounts smallest-first, so dp[a - c] is already final when consulted.
        for (int a = 1; a <= amount; ++a) {
            // Try every coin as the last one used: dp[a] = min(dp[a - c] + 1).
            for (int c : coins) {
                if (c <= a && dp[a - c] != INF && dp[a - c] + 1 < dp[a]) {
                    dp[a] = dp[a - c] + 1;
                }
            }
        }
        return dp[amount] == INF ? -1 : dp[amount];
    }
}

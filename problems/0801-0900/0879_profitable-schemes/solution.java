class Solution {

    public int profitableSchemes(int n, int minProfit, int[] group, int[] profit) {
        final int MOD = 1000000007;
        // dp[members][cap] = number of subsets using at most `members` members
        // and at least `cap` profit; cap is capped at minProfit.
        long[][] dp = new long[n + 1][minProfit + 1];
        for (int members = 0; members <= n; members++) {
            dp[members][0] = 1;
        }
        for (int idx = 0; idx < group.length; idx++) {
            int g = group[idx];
            int p = profit[idx];
            for (int members = n; members >= g; members--) {
                for (int cap = minProfit; cap >= 0; cap--) {
                    int prev = Math.max(0, cap - p);
                    dp[members][cap] = (dp[members][cap] + dp[members - g][prev]) % MOD;
                }
            }
        }
        return (int) dp[n][minProfit];
    }
}

class Solution {

    public int numberOfWays(int n, int x) {
        // A set of unique bases is exactly a choice of which distinct xth
        // powers to take, each at most once -- a counting knapsack.
        final int mod = 1000000007;
        long[] dp = new long[n + 1];
        dp[0] = 1;
        for (long base = 1; ; ++base) {
            long power = 1;
            for (int e = 0; e < x; ++e) power *= base;
            if (power > n) break;
            // Walking the sums downward reads dp[sum - power] at its
            // pre-power value, so no subset takes this power twice.
            for (int total = n; total >= power; --total) {
                dp[total] = (dp[total] + dp[total - (int) power]) % mod;
            }
        }
        return (int) dp[n];
    }
}

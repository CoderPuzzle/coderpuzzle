class Solution {

    public int selfDivisiblePermutationCount(int n) {
        // Position i (1-indexed) may receive value v exactly when gcd(v, i)
        // is 1. Precompute that compatibility grid once, then count valid
        // permutations with a subset DP: dp[mask] is the number of ways to
        // fill the first popcount(mask) positions using exactly the values
        // in mask, so extending by the last-placed value v gives
        // dp[mask] = sum over compatible v in mask of dp[mask without v].
        // Even the theoretical bound 12! fits an int, so no long is needed.
        boolean[][] compat = new boolean[n][n];
        for (int i = 1; i <= n; ++i) {
            for (int v = 1; v <= n; ++v) {
                compat[i - 1][v - 1] = gcd(v, i) == 1;
            }
        }
        int full = 1 << n;
        int[] dp = new int[full];
        dp[0] = 1;
        for (int mask = 1; mask < full; ++mask) {
            int pos = Integer.bitCount(mask); // 1-indexed position being filled now
            boolean[] row = compat[pos - 1];
            int total = 0;
            for (int v = 0; v < n; ++v) {
                if ((mask & (1 << v)) != 0 && row[v]) {
                    total += dp[mask ^ (1 << v)];
                }
            }
            dp[mask] = total;
        }
        return dp[full - 1];
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}

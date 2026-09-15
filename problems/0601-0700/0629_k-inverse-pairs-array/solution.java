class Solution {

    private static final int MOD = 1_000_000_007;

    public int kInversePairs(int n, int k) {
        // dp[j] counts the arrangements of the numbers placed so far that
        // have exactly j inverse pairs; inserting the new maximum m into
        // any of its m slots adds between 0 and m-1 pairs, so row m at j
        // is the sliding-window sum of row m-1 over [j-m+1, j]. `window`
        // is a long: before its reduction it can reach 3 * MOD, past int
        // range.
        int[] dp = new int[k + 1];
        int[] next = new int[k + 1];
        dp[0] = 1;
        for (int m = 2; m <= n; ++m) {
            long window = 0;
            for (int j = 0; j <= k; ++j) {
                window += dp[j];
                if (j >= m) window += MOD - dp[j - m];
                window %= MOD;
                next[j] = (int) window;
            }
            int[] swap = dp;
            dp = next;
            next = swap;
        }
        return dp[k];
    }
}

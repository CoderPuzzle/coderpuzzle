class Solution {

    public int numberOfWays(int n, int x, int y) {
        // dp[j] counts the assignments of the first i performers onto
        // exactly j nonempty of the x stages. The next performer either
        // joins one of the j formed bands or opens one on one of the
        // x - j + 1 unused stages; walking j downward updates the row in
        // place. Each j-band arrangement later takes a score per band, so
        // the answer sums dp[j] * y^j. All arithmetic is modulo 1e9 + 7,
        // applied bottom-up over performers and bands -- no recursion.
        // Residues are < 2^30 and every intermediate product < 2e12, so
        // long covers each step exactly.
        final long MOD = 1_000_000_007L;
        long[] dp = new long[x + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; ++i) {
            for (int j = Math.min(i, x); j >= 1; --j) {
                dp[j] = (dp[j] * j + dp[j - 1] * (x - j + 1)) % MOD;
            }
            dp[0] = 0;
        }
        long ans = 0;
        long power = 1;
        for (int j = 1; j <= x; ++j) {
            power = (power * y) % MOD;
            ans = (ans + dp[j] * power) % MOD;
        }
        return (int) ans;
    }
}

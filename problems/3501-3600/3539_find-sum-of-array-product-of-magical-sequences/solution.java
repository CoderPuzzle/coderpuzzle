class Solution {

    public int magicalSum(int m, int k, int[] nums) {
        // Forward DP over the indices of nums. State (j, b, mask) after a
        // prefix of indices: j sequence slots filled, b set bits of the sum
        // already finalized (every bit below the current index is fixed,
        // since later terms only add multiples of 2^i), and mask = partial
        // sum >> i, the carry window of not-yet-settled high bits (< 2^5).
        final long MOD = 1_000_000_007L;
        int n = nums.length;
        // comb[a][c]: ways to scatter c copies of index i into the a = m - j
        // sequence slots still unassigned.
        long[][] comb = new long[m + 1][m + 1];
        for (int a = 0; a <= m; a++) {
            comb[a][0] = 1;
            for (int c = 1; c <= a; c++) comb[a][c] = (comb[a - 1][c - 1] + comb[a - 1][c]) % MOD;
        }
        // pw[i][c] = nums[i]^c mod MOD (64-bit: the raw powers reach 1e16).
        long[][] pw = new long[n][m + 1];
        for (int i = 0; i < n; i++) {
            pw[i][0] = 1;
            for (int c = 1; c <= m; c++) pw[i][c] = (pw[i][c - 1] * nums[i]) % MOD;
        }
        long[][][] dp = new long[m + 1][m + 1][32];
        dp[0][0][0] = 1;
        for (int i = 0; i < n; i++) {
            long[][][] ndp = new long[m + 1][m + 1][32];
            for (int j = 0; j <= m; j++) {
                for (int b = 0; b <= m; b++) {
                    for (int mask = 0; mask < 32; mask++) {
                        long v = dp[j][b][mask];
                        if (v == 0) continue;
                        for (int c = 0; c <= m - j; c++) {
                            int t = mask + c;
                            int nb = b + (t & 1);
                            // Set bits of a sum of j+c powers never exceed
                            // j+c: prune lanes that can no longer reach k.
                            if (nb + Integer.bitCount(t >> 1) > j + c) continue;
                            long add = (((v * comb[m - j][c]) % MOD) * pw[i][c]) % MOD;
                            ndp[j + c][nb][t >> 1] = (ndp[j + c][nb][t >> 1] + add) % MOD;
                        }
                    }
                }
            }
            dp = ndp;
        }
        // After the last index, mask holds every remaining high bit: the
        // total set-bit count of the sum is b + popcount(mask).
        long ans = 0;
        for (int b = 0; b <= m; b++) for (int mask = 0; mask < 32; mask++) if (b + Integer.bitCount(mask) == k) ans =
            (ans + dp[m][b][mask]) % MOD;
        return (int) ans;
    }
}

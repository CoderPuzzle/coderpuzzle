class Solution {

    public int numberOfStableArrays(int zero, int one, int limit) {
        final long MOD = 1000000007L;
        // Count prefixes by usage and last character: f0[a][b] ends in 0,
        // f1[a][b] ends in 1. Each new character extends some block of at
        // most `limit` copies; looping over block lengths collapses into
        // a sliding window over pref0, the row-wise prefix sums of f0,
        // keeping the whole build bottom-up and iterative. Tables and
        // window accumulators are long: a window sums up to `limit`
        // residues (~10^9), reaching ~2 x 10^11 > 2^31.
        long[][] f0 = new long[zero + 1][one + 1];
        long[][] f1 = new long[zero + 1][one + 1];
        long[][] pref0 = new long[zero + 1][one + 2];
        for (int a = 1; a <= Math.min(limit, zero); ++a) {
            f0[a][0] = 1;
            pref0[a][1] = 1;
        }
        for (int b = 1; b <= one; ++b) {
            int low = Math.max(0, b - limit);
            for (int a = 0; a <= zero; ++a) {
                if (a == 0) {
                    f1[a][b] = b <= limit ? 1 : 0;
                } else {
                    f1[a][b] = (pref0[a][b] - pref0[a][low] + MOD) % MOD;
                }
            }
            long running = 0;
            for (int a = 1; a <= zero; ++a) {
                running += f1[a - 1][b];
                if (a - limit - 1 >= 0) {
                    running -= f1[a - limit - 1][b];
                    running = ((running % MOD) + MOD) % MOD;
                }
                f0[a][b] = running % MOD;
            }
            for (int a = 0; a <= zero; ++a) {
                pref0[a][b + 1] = (pref0[a][b] + f0[a][b]) % MOD;
            }
        }
        return (int) ((f0[zero][one] + f1[zero][one]) % MOD);
    }
}

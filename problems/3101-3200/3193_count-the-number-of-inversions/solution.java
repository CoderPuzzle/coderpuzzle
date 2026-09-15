import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfPermutations(int n, int[][] requirements) {
        final int MOD = 1_000_000_007;
        Map<Integer, Integer> req = new HashMap<>();
        int maxCnt = 0;
        for (int[] r : requirements) {
            req.put(r[0], r[1]);
            maxCnt = Math.max(maxCnt, r[1]);
        }

        // dp[j] = number of permutations of length i with j inversions.
        // Growing length i -> i+1 adds between 0 and i new inversions.
        long[] dp = new long[maxCnt + 1];
        dp[0] = 1;
        long[] prefix = new long[maxCnt + 2];
        long[] ndp = new long[maxCnt + 1];
        for (int i = 1; i <= n; i++) {
            if (i > 1) {
                long s = 0;
                for (int j = 0; j <= maxCnt; j++) {
                    s = (s + dp[j]) % MOD;
                    prefix[j + 1] = s;
                }
                for (int j = 0; j <= maxCnt; j++) {
                    int lo = Math.max(0, j - (i - 1));
                    ndp[j] = (prefix[j + 1] - prefix[lo] + MOD) % MOD;
                }
                long[] tmp = dp;
                dp = ndp;
                ndp = tmp;
            }
            if (req.containsKey(i - 1)) {
                int c = req.get(i - 1);
                for (int j = 0; j <= maxCnt; j++) {
                    if (j != c) {
                        dp[j] = 0;
                    }
                }
            }
        }
        return (int) (dp[req.get(n - 1)] % MOD);
    }
}

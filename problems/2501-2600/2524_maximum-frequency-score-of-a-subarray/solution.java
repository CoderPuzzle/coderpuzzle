import java.util.HashMap;
import java.util.Map;

class Solution {

    // Residues are below 2^30, so a product fits in long before the %.
    private static long qpow(long base, long exp, long mod) {
        long result = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }

    public int maxFrequencyScore(int[] nums, int k) {
        // Sliding window maintaining the score as the sum of per-value
        // power terms; a slide replaces only the entering and leaving
        // values' terms, which is O(log MOD) per step. The +MOD
        // re-normalizes after each potentially negative subtraction.
        final int MOD = 1_000_000_007;
        Map<Integer, Integer> counts = new HashMap<>();
        Map<Integer, Long> terms = new HashMap<>();
        long score = 0;
        long best = 0;
        for (int i = 0; i < nums.length; ++i) {
            int value = nums[i];
            int c = counts.getOrDefault(value, 0) + 1;
            counts.put(value, c);
            long term = qpow(value, c, MOD);
            score = (score + term - terms.getOrDefault(value, 0L) + MOD) % MOD;
            terms.put(value, term);
            if (i >= k) {
                int leaving = nums[i - k];
                int lc = counts.get(leaving);
                counts.put(leaving, lc - 1);
                if (lc == 1) {
                    // the leaving value exits entirely; its term vanishes
                    score = (score - terms.get(leaving) + MOD) % MOD;
                    terms.remove(leaving);
                } else {
                    long lt = qpow(leaving, lc - 1, MOD);
                    score = (score + lt - terms.get(leaving) + MOD) % MOD;
                    terms.put(leaving, lt);
                }
            }
            if (i >= k - 1 && score > best) best = score;
        }
        return (int) best;
    }
}

import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countSequences(int[] nums, long k) {
        // Every element is 1..6, hence 5-smooth: val is always the
        // rational 2^a * 3^b * 5^c, and each action shifts the exponent
        // triple by +e, -e, or 0, where e is the element's own (2, 3, 5)
        // split. A sequence wins exactly when the final triple matches
        // k's, so k keeping any prime factor above 5 is an immediate 0.
        // A triple packs into one key ((a + 40) * 41 + b + 20) * 41 +
        // (c + 20): |a| <= 2n <= 38 and |b|, |c| <= n <= 19 keep the low
        // digits inside a stride of 41, so key +/- the element's packed
        // step never borrows across digits.
        int[] primes = { 2, 3, 5 };
        long[] t = new long[3];
        for (int i = 0; i < 3; i++) {
            while (k % primes[i] == 0) {
                k /= primes[i];
                t[i]++;
            }
        }
        if (k != 1) {
            return 0;
        }
        long target = ((t[0] + 40) * 41 + (t[1] + 20)) * 41 + (t[2] + 20);
        Map<Long, Long> dp = new HashMap<>();
        dp.put((40L * 41 + 20) * 41 + 20, 1L);
        for (int v : nums) {
            long[] e = new long[3];
            long w = v;
            for (int i = 0; i < 3; i++) {
                while (w % primes[i] == 0) {
                    w /= primes[i];
                    e[i]++;
                }
            }
            long step = (e[0] * 41 + e[1]) * 41 + e[2];
            Map<Long, Long> ndp = new HashMap<>();
            for (Map.Entry<Long, Long> en : dp.entrySet()) {
                long key = en.getKey();
                long wt = en.getValue();
                // multiply by v, leave val alone, divide by v
                ndp.merge(key + step, wt, Long::sum);
                ndp.merge(key, wt, Long::sum);
                ndp.merge(key - step, wt, Long::sum);
            }
            dp = ndp;
        }
        // Every count is bounded by the total sequence count
        // 3^19 = 1,162,261,467, inside 32 bits; accumulators run in long.
        Long ans = dp.get(target);
        return ans == null ? 0 : ans.intValue();
    }
}

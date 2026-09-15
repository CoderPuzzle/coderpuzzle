import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfGoodSubsets(int[] nums) {
        final int MOD = 1000000007;
        final int[] PRIMES = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 };

        // Compress to frequencies: subsets are distinguished by index, so
        // equal values contribute multiplicity.
        Map<Integer, Integer> count = new HashMap<>();
        for (int v : nums) {
            count.merge(v, 1, Integer::sum);
        }

        int size = 1 << PRIMES.length;
        // dp[mask] = ways to pick indices whose product's prime set is
        // exactly mask -- a 0/1-knapsack over prime masks.
        long[] dp = new long[size];
        dp[0] = 1;
        for (Map.Entry<Integer, Integer> e : count.entrySet()) {
            int value = e.getKey();
            int freq = e.getValue();
            if (value == 1) {
                // empty mask; handled separately at the end
                continue;
            }
            // Map the value onto its 10-bit prime mask; reject values
            // divisible by a prime square (4, 8, 9, ...).
            int mask = 0;
            boolean bad = false;
            int x = value;
            for (int i = 0; i < PRIMES.length; i++) {
                int p = PRIMES[i];
                if (x % p == 0) {
                    mask |= 1 << i;
                    x /= p;
                    if (x % p == 0) {
                        bad = true;
                        break;
                    }
                }
            }
            if (bad || mask == 0) {
                continue;
            }
            // Decreasing mask order keeps one value from being used twice in
            // a subset; only disjoint states (no shared prime) may extend.
            for (int prev = size - 1; prev >= 0; prev--) {
                if (dp[prev] != 0 && (prev & mask) == 0) {
                    dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD;
                }
            }
        }
        // Good subsets need at least one prime: sum every non-empty mask.
        long total = 0;
        for (int i = 1; i < size; i++) {
            total = (total + dp[i]) % MOD;
        }
        // Each 1 freely appends to any good subset without changing the
        // product: a factor 2^count[1].
        long ones = count.getOrDefault(1, 0);
        long pow = 1;
        for (long i = 0; i < ones; i++) {
            pow = (pow * 2) % MOD;
        }
        return (int) ((total * pow) % MOD);
    }
}

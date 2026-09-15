import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countPrimes(int n) {
        // No primes strictly below 2.
        if (n < 3) {
            return 0;
        }
        // spf[x] = the smallest prime factor of x (0 while x is untouched);
        // the primes found so far collect in ascending order.
        int[] spf = new int[n];
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i < n; i++) {
            if (spf[i] == 0) {
                // Nothing smaller ever marked i, so i is prime (and its own
                // smallest prime factor).
                primes.add(i);
                spf[i] = i;
            }
            // Mark i*p composite for every prime p up to spf[i]: each
            // composite gets written exactly once, by its smallest factor.
            for (int p : primes) {
                if (p > spf[i] || (long) i * p >= n) {
                    break;
                }
                spf[i * p] = p;
            }
        }
        return primes.size();
    }
}

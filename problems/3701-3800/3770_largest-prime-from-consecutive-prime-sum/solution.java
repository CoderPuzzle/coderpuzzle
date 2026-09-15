class Solution {

    public long largestPrime(int n) {
        // Sieve once: it answers primality for every prime and for every
        // running total the scan below produces.
        boolean[] sieve = new boolean[n + 1];
        for (int i = 0; i <= n; ++i) {
            sieve[i] = true;
        }
        sieve[0] = false;
        if (n >= 1) {
            sieve[1] = false;
        }
        for (int i = 2; (long) i * i <= n; i++) {
            if (sieve[i]) {
                for (int j = i * i; j <= n; j += i) {
                    sieve[j] = false;
                }
            }
        }
        // Prefix sums of the prime sequence are exactly the consecutive
        // prime sums starting from 2; totals only grow, so the last prime
        // one seen before the total exceeds n is the largest. Totals pass
        // the 32-bit range near n = 5 * 10^5, so they accumulate in a long.
        long total = 0;
        long best = 0;
        for (int p = 2; p <= n; p++) {
            if (!sieve[p]) {
                continue;
            }
            total += p;
            if (total > n) {
                break;
            }
            if (sieve[(int) total]) {
                best = total;
            }
        }
        return best;
    }
}

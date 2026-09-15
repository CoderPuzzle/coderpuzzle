class Solution {
  public:
    long long largestPrime(int n) {
        // Sieve once: it answers primality for every prime and for every
        // running total the scan below produces.
        vector<char> sieve(n + 1, 1);
        sieve[0] = 0;
        if (n >= 1)
            sieve[1] = 0;
        for (long long i = 2; i * i <= n; ++i) {
            if (sieve[i]) {
                for (long long j = i * i; j <= n; j += i)
                    sieve[j] = 0;
            }
        }
        // Prefix sums of the prime sequence are exactly the consecutive
        // prime sums starting from 2; totals only grow, so the last prime
        // one seen before the total exceeds n is the largest. Totals pass
        // the 32-bit range near n = 5 * 10^5, so they accumulate in a
        // long long.
        long long total = 0;
        long long best = 0;
        for (int p = 2; p <= n; ++p) {
            if (!sieve[p])
                continue;
            total += p;
            if (total > n)
                break;
            if (sieve[total])
                best = total;
        }
        return best;
    }
};

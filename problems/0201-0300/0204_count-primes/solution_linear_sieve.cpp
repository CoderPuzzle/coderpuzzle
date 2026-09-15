class Solution {
  public:
    int countPrimes(int n) {
        // No primes strictly below 2.
        if (n < 3)
            return 0;
        // spf[x] = the smallest prime factor of x (0 while x is untouched);
        // the primes found so far collect in ascending order.
        vector<int> spf(n, 0);
        vector<int> primes;
        primes.reserve(n / 10 + 16);
        for (int i = 2; i < n; ++i) {
            if (spf[i] == 0) {
                // Nothing smaller ever marked i, so i is prime (and its own
                // smallest prime factor).
                primes.push_back(i);
                spf[i] = i;
            }
            // Mark i*p composite for every prime p up to spf[i]: each
            // composite gets written exactly once, by its smallest factor.
            for (int p : primes) {
                if (p > spf[i] || (long long)i * p >= n)
                    break;
                spf[i * p] = p;
            }
        }
        return (int)primes.size();
    }
};

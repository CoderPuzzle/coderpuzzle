class Solution {
  public:
    int numPrimeArrangements(int n) {
        const long long MOD = 1000000007LL;

        // Sieve of Eratosthenes up to n.
        vector<bool> isPrime(n + 1, true);
        isPrime[0] = false;
        if (n >= 1) {
            isPrime[1] = false;
        }
        for (int p = 2; (long long)p * p <= n; p++) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple <= n; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }
        int primes = 0;
        for (int m = 0; m <= n; m++) {
            if (isPrime[m]) {
                primes++;
            }
        }

        // Primes may permute over prime indices; everything else (1 and
        // the composites) permutes over the rest. Independent choices.
        long long result = 1;
        for (int k = 2; k <= primes; k++) {
            result = result * k % MOD;
        }
        for (int k = 2; k <= n - primes; k++) {
            result = result * k % MOD;
        }
        return (int)result;
    }
};

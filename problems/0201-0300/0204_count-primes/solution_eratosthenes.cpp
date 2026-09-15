class Solution {
  public:
    int countPrimes(int n) {
        // No primes strictly below 2.
        if (n < 3)
            return 0;
        // Sieve of Eratosthenes: whatever is never marked composite was not
        // a multiple of anything smaller, so it is prime.
        vector<char> isComposite(n, 0);
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (!isComposite[i]) {
                count++;
                // Cross off multiples starting at i*i — smaller multiples
                // were marked by their smaller factors.
                if ((long long)i * i < n) {
                    for (long long j = (long long)i * i; j < n; j += i) {
                        isComposite[j] = 1;
                    }
                }
            }
        }
        return count;
    }
};

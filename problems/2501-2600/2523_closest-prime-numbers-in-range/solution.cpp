#include <vector>

class Solution {
  public:
    std::vector<int> closestPrimes(int left, int right) {
        // Sieve of Eratosthenes up to right marks every prime once; one
        // ascending pass over [left, right] then walks only consecutive
        // primes, since a larger gap spanning a skipped prime can never
        // beat the adjacent gaps inside it. Replacing on strict
        // improvement keeps the earliest num1 among ties.
        std::vector<char> sieve(right + 1, 1);
        if (right >= 0)
            sieve[0] = 0;
        if (right >= 1)
            sieve[1] = 0;
        for (long long f = 2; f * f <= right; ++f) {
            if (!sieve[f])
                continue;
            for (long long m = f * f; m <= right; m += f)
                sieve[m] = 0;
        }
        std::vector<int> bestPair{-1, -1};
        int previous = -1;
        for (int n = left; n <= right; ++n) {
            if (!sieve[n])
                continue;
            if (previous != -1 && (bestPair[0] == -1 || n - previous < bestPair[1] - bestPair[0])) {
                bestPair[0] = previous;
                bestPair[1] = n;
            }
            previous = n;
        }
        return bestPair;
    }
};

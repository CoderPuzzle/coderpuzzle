class Solution {
  public:
    int countPrimeSetBits(int left, int right) {
        // A 0/1 table indexed by set-bit count holds the primality
        // verdict for every count the bound allows: right <= 10^6 fits
        // in twenty bits, so the count is 1..19 and the primes there
        // are 2, 3, 5, 7, 11, 13, 17, 19. Index 1 holds 0 — a lone set
        // bit, the value 1 and every power of two, is not prime — so
        // each candidate costs one popcount plus one table read.
        int isPrime[21] = {};
        for (int p : {2, 3, 5, 7, 11, 13, 17, 19}) {
            isPrime[p] = 1;
        }
        int count = 0;
        for (int n = left; n <= right; ++n) {
            count += isPrime[__builtin_popcount(n)];
        }
        return count;
    }
};

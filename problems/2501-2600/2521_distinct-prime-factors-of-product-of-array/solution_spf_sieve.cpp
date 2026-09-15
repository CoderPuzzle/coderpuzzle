#include <algorithm>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int distinctPrimeFactors(std::vector<int> &nums) {
        // The prime-support pin is the same; the factor source changes.
        // One sieve pass records the smallest prime factor of every value
        // up to max(nums), and each element then falls apart by repeated
        // division: the next piece of the remaining quotient is always a
        // table lookup, never a candidate search. Peeling each prime out
        // completely keeps the walk on sieve entries; values are <= 1000,
        // so an element holds at most 9 prime pieces (2^10 overshoots).
        int limit = *max_element(nums.begin(), nums.end());
        std::vector<int> spf(limit + 1);
        for (int i = 0; i <= limit; ++i)
            spf[i] = i;
        for (int i = 2; (long long)i * i <= limit; ++i) {
            if (spf[i] == i) {
                for (long long j = (long long)i * i; j <= limit; j += i) {
                    if (spf[j] == j)
                        spf[j] = i;
                }
            }
        }
        std::unordered_set<int> primes;
        for (int value : nums) {
            int rest = value;
            while (rest > 1) {
                int p = spf[rest];
                primes.insert(p);
                while (rest % p == 0)
                    rest /= p;
            }
        }
        return (int)primes.size();
    }
};

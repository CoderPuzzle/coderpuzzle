#include <unordered_set>
#include <vector>

class Solution {
  public:
    int distinctPrimeFactors(std::vector<int> &nums) {
        // The product never gets built (per the hint, it is astronomically
        // large): a prime divides the product exactly when it divides some
        // single element. Factor each element by trial division, peeling
        // every copy of a found factor so only primes escape the loop;
        // values are <= 1000, so candidates stay <= 31 once squared.
        std::unordered_set<int> primes;
        for (int value : nums) {
            int rest = value;
            for (int d = 2; (long long)d * d <= rest; ++d) {
                if (rest % d == 0) {
                    primes.insert(d);
                    while (rest % d == 0)
                        rest /= d;
                }
            }
            if (rest > 1)
                primes.insert(rest);
        }
        return (int)primes.size();
    }
};

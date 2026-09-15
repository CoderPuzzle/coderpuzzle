#include <cmath>
#include <vector>

class Solution {
  public:
    int nonSpecialCount(int l, int r) {
        // A number is special exactly when it is the square of a prime:
        // p*p has precisely the proper divisors 1 and p, any other number
        // has more than two (three divisors total forces the form
        // prime^2), and 1 itself has none. The specials in [l, r] are
        // therefore the squares of primes in [ceil(sqrt(l)),
        // floor(sqrt(r))] — at most sqrt(10^9) ~ 31623 candidates,
        // counted with one sieve. Square roots start from sqrtl but are
        // corrected with exact long long multiplies, so rounding can
        // never move a boundary.
        auto isqrt = [](long long x) {
            long long s = sqrtl((long double)x);
            while (s * s > x) {
                --s;
            }
            while ((s + 1) * (s + 1) <= x) {
                ++s;
            }
            return s;
        };
        long long hi = isqrt(r);
        long long lo = isqrt((long long)l - 1) + 1; // smallest s: s*s >= l
        std::vector<char> composite(hi + 1, 0);
        long long specials = 0;
        for (long long p = 2; p <= hi; ++p) {
            if (composite[p]) {
                continue;
            }
            if (p >= lo) {
                ++specials;
            }
            for (long long m = p * p; m <= hi; m += p) {
                composite[m] = 1;
            }
        }
        return static_cast<int>((long long)r - l + 1 - specials);
    }
};

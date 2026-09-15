#include <unordered_map>
#include <vector>

class Solution {
  public:
    int countSequences(vector<int> &nums, long long k) {
        // Every element is 1..6, hence 5-smooth: val is always the
        // rational 2^a * 3^b * 5^c, and each action shifts the exponent
        // triple by +e, -e, or 0, where e is the element's own (2, 3, 5)
        // split. A sequence wins exactly when the final triple matches
        // k's, so k keeping any prime factor above 5 is an immediate 0.
        // A triple packs into one key ((a + 40) * 41 + b + 20) * 41 +
        // (c + 20): |a| <= 2n <= 38 and |b|, |c| <= n <= 19 keep the low
        // digits inside a stride of 41, so key +/- the element's packed
        // step never borrows across digits.
        const long long primes[3] = {2, 3, 5};
        long long t[3] = {0, 0, 0};
        for (int i = 0; i < 3; i++) {
            while (k % primes[i] == 0) {
                k /= primes[i];
                t[i]++;
            }
        }
        if (k != 1) {
            return 0;
        }
        long long target = ((t[0] + 40) * 41 + (t[1] + 20)) * 41 + (t[2] + 20);
        unordered_map<long long, long long> dp;
        dp[(40LL * 41 + 20) * 41 + 20] = 1;
        for (int v : nums) {
            long long e[3] = {0, 0, 0};
            long long w = v;
            for (int i = 0; i < 3; i++) {
                while (w % primes[i] == 0) {
                    w /= primes[i];
                    e[i]++;
                }
            }
            long long step = (e[0] * 41 + e[1]) * 41 + e[2];
            unordered_map<long long, long long> ndp;
            for (auto &kv : dp) {
                // multiply by v, leave val alone, divide by v
                for (long long nk : {kv.first + step, kv.first, kv.first - step}) {
                    ndp[nk] += kv.second;
                }
            }
            dp = move(ndp);
        }
        // Every count is bounded by the total sequence count
        // 3^19 = 1,162,261,467, inside 32 bits; accumulators run in long
        // long.
        auto it = dp.find(target);
        return it == dp.end() ? 0 : (int)it->second;
    }
};

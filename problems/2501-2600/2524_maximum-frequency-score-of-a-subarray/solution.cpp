#include <unordered_map>
#include <vector>

class Solution {
  public:
    static long long qpow(long long base, long long exp, long long mod) {
        // Residues are below 2^30, so products fit in long long before %.
        long long result = 1;
        while (exp > 0) {
            if (exp & 1)
                result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }

    int maxFrequencyScore(std::vector<int> &nums, int k) {
        // Sliding window maintaining the score as the sum of per-value
        // power terms; a slide replaces only the entering and leaving
        // values' terms, which is O(log MOD) per step. The +MOD
        // re-normalizes after each potentially negative subtraction.
        const long long MOD = 1'000'000'007;
        std::unordered_map<int, int> counts;
        std::unordered_map<int, long long> terms;
        long long score = 0;
        long long best = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int value = nums[i];
            int c = ++counts[value];
            long long term = qpow(value, c, MOD);
            auto oldTerm = terms.find(value);
            long long previous = oldTerm == terms.end() ? 0 : oldTerm->second;
            score = (score + term - previous + MOD) % MOD;
            terms[value] = term;
            if (i >= k) {
                int leaving = nums[i - k];
                int lc = --counts[leaving];
                if (lc == 0) {
                    // the leaving value exits entirely; its term vanishes
                    score = (score - terms[leaving] + MOD) % MOD;
                    terms.erase(leaving);
                } else {
                    long long lt = qpow(leaving, lc, MOD);
                    score = (score + lt - terms[leaving] + MOD) % MOD;
                    terms[leaving] = lt;
                }
            }
            if (i >= k - 1 && score > best)
                best = score;
        }
        return (int)best;
    }
};

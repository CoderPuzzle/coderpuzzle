class Solution {
  public:
    int threeSumMulti(vector<int> &arr, int target) {
        // Count occurrences of each value, then enumerate value pairs
        // (a, b) with a <= b; the required third value c = target - a - b
        // is accepted only when c >= b, so each unordered value multiset
        // {a, b, c} is priced exactly once. The index count is C(ca, 3)
        // when a == b == c, C(ca, 2) * cc or ca * C(cb, 2) when exactly
        // two coincide, and ca * cb * cc when all three differ — each
        // term reduced mod 10^9 + 7 as it is added, since C(3000, 3) is
        // far past 32 bits before the modulus ever fires.
        constexpr long long MOD = 1'000'000'007;
        unordered_map<int, long long> counts;
        for (int value : arr) {
            ++counts[value];
        }
        vector<int> values;
        values.reserve(counts.size());
        for (const auto &entry : counts) {
            values.push_back(entry.first);
        }
        sort(values.begin(), values.end());
        int d = static_cast<int>(values.size());
        long long total = 0;
        for (int i = 0; i < d; ++i) {
            int a = values[i];
            long long ca = counts[a];
            for (int j = i; j < d; ++j) {
                int b = values[j];
                int c = target - a - b;
                if (c < b) {
                    break;
                }
                auto found = counts.find(c);
                if (found == counts.end()) {
                    continue;
                }
                long long cb = counts[b];
                long long cc = found->second;
                long long term;
                if (a == b && b == c) {
                    term = ca * (ca - 1) * (ca - 2) / 6;
                } else if (a == b) {
                    term = ca * (ca - 1) / 2 * cc;
                } else if (b == c) {
                    term = ca * cb * (cb - 1) / 2;
                } else {
                    term = ca * cb * cc;
                }
                total = (total + term) % MOD;
            }
        }
        return static_cast<int>(total);
    }
};

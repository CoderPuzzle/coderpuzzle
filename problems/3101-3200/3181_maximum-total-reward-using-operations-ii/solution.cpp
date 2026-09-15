class Solution {
  public:
    int maxTotalReward(vector<int> &rewardValues) {
        // Sort and dedupe; a duplicate value can never be taken twice
        // (it would require value > running total >= value).
        vector<int> values = rewardValues;
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        int maxv = values.back();

        // Bitset DP over totals < 2*maxv, stored as 64-bit words.
        int words = (2 * maxv) / 64 + 2;
        vector<unsigned long long> dp(words, 0ULL);
        dp[0] = 1ULL;
        for (int x : values) {
            int w = x / 64, b = x % 64;
            // shifted = (dp & ((1<<x)-1)) << x, or'ed into dp.
            // Read source words high-to-low so writes never corrupt a source.
            for (int i = w; i >= 0; --i) {
                unsigned long long low = dp[i];
                if (i == w) {
                    low &= (b == 0) ? 0ULL : ((1ULL << b) - 1ULL);
                }
                int t = i + w;
                if (t < words) {
                    dp[t] |= low << b;
                }
                if (b != 0 && t + 1 < words) {
                    dp[t + 1] |= low >> (64 - b);
                }
            }
        }
        for (int i = words - 1; i >= 0; --i) {
            if (dp[i] != 0ULL) {
                return i * 64 + 63 - __builtin_clzll(dp[i]);
            }
        }
        return 0;
    }
};

class Solution {
  public:
    int maxWeight(int n, vector<vector<int>> &edges, int k, int t) {
        // Layered bitset DP over path sums: bit s of node v's word array
        // is set iff some path of exactly j edges ends at v with total
        // exactly s (s < t). Weights are >= 1, so a total < t never passes
        // through a prefix >= t, and masking mid-path never drops a path.
        int words = (t + 63) / 64;
        vector<unsigned long long> full(words, ~0ULL);
        if (t % 64 != 0)
            full[words - 1] = (1ULL << (t % 64)) - 1ULL;
        vector<unsigned long long> dp((size_t)n * words, 0ULL), ndp((size_t)n * words, 0ULL);
        for (int v = 0; v < n; v++)
            dp[(size_t)v * words] = 1ULL; // empty path (sum 0) everywhere
        for (int j = 0; j < k; j++) {
            fill(ndp.begin(), ndp.end(), 0ULL);
            for (auto &e : edges) {
                size_t base = (size_t)e[0] * words, to = (size_t)e[1] * words;
                int w = e[2];
                for (int i = words - 1; i >= 0; i--) {
                    unsigned long long val = dp[base + i] << w;
                    if (i > 0)
                        val |= dp[base + i - 1] >> (64 - w);
                    ndp[to + i] |= val & full[i];
                }
            }
            swap(dp, ndp);
        }
        int best = -1;
        for (int v = 0; v < n; v++)
            for (int i = words - 1; i >= 0; i--)
                if (dp[(size_t)v * words + i]) {
                    int s = 64 * i + 63 - __builtin_clzll(dp[(size_t)v * words + i]);
                    best = max(best, s);
                    break;
                }
        return best;
    }
};

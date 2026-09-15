class Solution {
  public:
    int minimumIncompatibility(vector<int> &nums, int k) {
        // Every group has exactly n/k elements and no repeated value, so a
        // group is a set of n/k indices whose values are pairwise distinct —
        // and with values in 1..n, distinctness is itself a 16-bit check.
        // Precompute every valid group once, with cost max - min, bucketed
        // under each index it contains, then run a DP over bitmasks of
        // undistributed elements: each state removes the group covering its
        // lowest remaining index, which collapses the k! orderings of one
        // partition, and a full mask no group ever reaches is the -1 case.
        int n = (int)nums.size();
        int size = n / k;
        int total = 1 << n;
        vector<vector<pair<int, int>>> buckets(n);
        for (int g = 0; g < total; g++) {
            if (__builtin_popcount(g) != size)
                continue;
            int seen = 0, lo = n + 1, hi = 0;
            bool valid = true;
            for (int i = 0; i < n; i++) {
                if (!(g >> i & 1))
                    continue;
                int vbit = 1 << (nums[i] - 1);
                if (seen & vbit) {
                    valid = false;
                    break;
                }
                seen |= vbit;
                lo = min(lo, nums[i]);
                hi = max(hi, nums[i]);
            }
            if (!valid)
                continue;
            int cost = hi - lo;
            for (int i = 0; i < n; i++) {
                if (g >> i & 1)
                    buckets[i].push_back({g, cost});
            }
        }
        const int INF = 1'000'000;
        vector<int> dp(total, INF);
        dp[0] = 0;
        for (int mask = 1; mask < total; mask++) {
            if (__builtin_popcount(mask) % size)
                continue;
            int best = INF;
            for (const auto &[g, cost] : buckets[__builtin_ctz(mask)]) {
                if ((g & mask) == g)
                    best = min(best, dp[mask ^ g] + cost);
            }
            dp[mask] = best;
        }
        return dp[total - 1] >= INF ? -1 : dp[total - 1];
    }
};

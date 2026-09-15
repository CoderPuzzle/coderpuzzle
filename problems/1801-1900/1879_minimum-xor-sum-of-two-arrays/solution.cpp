class Solution {
  public:
    int minimumXORSum(vector<int> &nums1, vector<int> &nums2) {
        int n = (int)nums1.size();
        int size = 1 << n;
        const long long INF = LLONG_MAX;
        vector<long long> dp(size, INF);
        dp[0] = 0;
        for (int mask = 1; mask < size; mask++) {
            int i = __builtin_popcount(mask) - 1; // index into nums1 for this subset
            long long x = nums1[i];
            long long best = INF;
            int m = mask;
            while (m) {
                int lowbit = m & (-m);
                int j = __builtin_ctz(lowbit);
                long long cand = dp[mask ^ lowbit] + (x ^ (long long)nums2[j]);
                if (cand < best)
                    best = cand;
                m -= lowbit;
            }
            dp[mask] = best;
        }
        return (int)dp[size - 1];
    }
};

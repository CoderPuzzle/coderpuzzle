class Solution {
  public:
    long long minimumCost(vector<int> &nums, vector<int> &cost, int k) {
        int n = (int)nums.size();
        vector<long long> prefNums(n + 1, 0), prefCost(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefNums[i + 1] = prefNums[i] + nums[i];
            prefCost[i + 1] = prefCost[i] + cost[i];
        }

        const long long INF = LLONG_MAX / 4;
        // dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
        vector<long long> dp(n + 1, INF);
        dp[n] = 0;
        long long totalCost = prefCost[n];
        // Right-to-left so every suffix value dp[j+1] is ready when needed.
        for (int i = n - 1; i >= 0; i--) {
            long long best = INF;
            // Take [i, j] as the first block. The k*index term telescopes: each
            // block is charged k * (cost mass from i to the array's end), a
            // self-contained penalty independent of later split choices.
            for (int j = i; j < n; j++) {
                // prefNums[j+1] is the whole-array prefix through j, matching the
                // nums[0..r] factor of the formula, not the block's own sum.
                long long seg = prefNums[j + 1] * (prefCost[j + 1] - prefCost[i]);
                seg += (long long)k * (totalCost - prefCost[i]);
                long long cand = seg + dp[j + 1];
                if (cand < best)
                    best = cand;
            }
            dp[i] = best;
        }
        return dp[0];
    }
};

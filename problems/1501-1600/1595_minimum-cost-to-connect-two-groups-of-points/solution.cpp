class Solution {
  public:
    int connectTwoGroups(vector<vector<int>> &cost) {
        int size1 = (int)cost.size(), size2 = (int)cost[0].size();
        int full = 1 << size2;
        const int INF = 1'000'000;

        // minToReach[j]: cheapest single edge that reaches second-group
        // point j from ANY first-group point, used to force coverage of
        // whichever second-group points the forward pass leaves untouched.
        vector<int> minToReach(size2, INF);
        for (int j = 0; j < size2; ++j)
            for (int i = 0; i < size1; ++i)
                minToReach[j] = min(minToReach[j], cost[i][j]);

        // dp[mask]: cheapest way to finish connecting everything once the
        // first-group points placed so far have reached exactly `mask`.
        // Seed with no first-group points left to place: every second-group
        // point missing from mask must be force-connected at its own
        // cheapest edge.
        vector<int> dp(full, 0);
        for (int mask = 0; mask < full; ++mask) {
            int total = 0;
            for (int j = 0; j < size2; ++j)
                if (!((mask >> j) & 1))
                    total += minToReach[j];
            dp[mask] = total;
        }

        for (int i = size1 - 1; i >= 0; --i) {
            vector<int> next(full, INF);
            for (int mask = 0; mask < full; ++mask) {
                for (int j = 0; j < size2; ++j) {
                    int candidate = cost[i][j] + dp[mask | (1 << j)];
                    if (candidate < next[mask])
                        next[mask] = candidate;
                }
            }
            dp = move(next);
        }

        return dp[0];
    }
};

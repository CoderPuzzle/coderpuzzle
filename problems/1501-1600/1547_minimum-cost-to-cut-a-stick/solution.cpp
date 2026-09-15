class Solution {
  public:
    int minCost(int n, vector<int> &cuts) {
        vector<int> positions(cuts);
        positions.push_back(0);
        positions.push_back(n);
        // Sorting matters: the cutting order is free while the input order
        // is not, and the sentinel endpoints make the outermost segments
        // uniform.
        sort(positions.begin(), positions.end());
        int size = (int)positions.size();
        // dp[i][j]: minimum cost of all cuts strictly between boundaries i
        // and j; adjacent boundaries (no interior cut) stay 0.
        vector<vector<int>> dp(size, vector<int>(size, 0));
        // Fill by increasing segment length so both subproblems of an
        // interval are already solved when it needs them.
        for (int length = 2; length < size; length++) {
            for (int i = 0; i + length < size; i++) {
                int j = i + length;
                int best = INT_MAX;
                // Try every interior boundary as the first cut: it splits
                // the segment into independent subproblems and costs the
                // segment's full length.
                for (int k = i + 1; k < j; k++) {
                    if (dp[i][k] + dp[k][j] < best)
                        best = dp[i][k] + dp[k][j];
                }
                dp[i][j] = best + (positions[j] - positions[i]);
            }
        }
        return dp[0][size - 1];
    }
};

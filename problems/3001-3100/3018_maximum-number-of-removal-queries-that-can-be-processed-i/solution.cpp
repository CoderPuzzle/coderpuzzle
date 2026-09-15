class Solution {
  public:
    int maximumProcessableQueries(vector<int> &nums, vector<int> &queries) {
        int n = nums.size(), m = queries.size();
        // dp[l][r]: most queries processable while nums[l:r] all survive. The
        // window starts as the whole array and shrinks one index per step; a
        // leaving end either serves the next query in order or was dropped
        // silently by the once-only subsequence op.
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));
        int best = 0;
        for (int span = n - 1; span >= 0; --span) {
            for (int l = 0; l + span <= n; ++l) {
                int r = l + span;
                int t = 0;
                if (l > 0) {
                    int p = dp[l - 1][r];
                    t = max(t, p);
                    if (p < m && nums[l - 1] >= queries[p])
                        t = max(t, p + 1);
                }
                if (r < n) {
                    int p = dp[l][r + 1];
                    t = max(t, p);
                    if (p < m && nums[r] >= queries[p])
                        t = max(t, p + 1);
                }
                dp[l][r] = t;
                // Every survivor block can be op-deleted too, so empty
                // windows carry the answer.
                if (span == 0)
                    best = max(best, t);
            }
        }
        return best;
    }
};

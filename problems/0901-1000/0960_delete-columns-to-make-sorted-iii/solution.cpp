class Solution {
  public:
    int minDeletionSize(vector<string> &strs) {
        // dp[j] = the most columns a valid surviving chain can hold when it
        // ends at column j; a later column extends it only when no row
        // descends between the two columns.
        size_t rows = strs.size(), cols = strs[0].size();
        vector<size_t> dp(cols, 1);
        size_t best = 1;
        for (size_t j = 0; j < cols; ++j) {
            for (size_t i = 0; i < j; ++i) {
                bool ok = true;
                for (size_t r = 0; r < rows && ok; ++r) {
                    if (strs[r][i] > strs[r][j]) {
                        ok = false;
                    }
                }
                if (ok && dp[i] + 1 > dp[j]) {
                    dp[j] = dp[i] + 1;
                }
            }
            if (dp[j] > best) {
                best = dp[j];
            }
        }
        return int(cols - best);
    }
};

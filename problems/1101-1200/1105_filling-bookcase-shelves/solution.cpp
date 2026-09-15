class Solution {
  public:
    int minHeightShelves(vector<vector<int>> &books, int shelfWidth) {
        // Order is fixed and each shelf holds a contiguous run, so the only
        // freedom is where boundaries fall: dp[i] = best height for the first
        // i books, with dp[0] = 0 as the empty base.
        int count = books.size();
        vector<long long> dp(count + 1, 0);
        for (int i = 1; i <= count; i++) {
            // Grow the last shelf of the prefix backwards from book i-1,
            // accumulating width and the run's max height.
            long long width = 0;
            int height = 0;
            dp[i] = LLONG_MAX;
            for (int j = i - 1; j >= 0; j--) {
                width += books[j][0];
                // Earlier books only widen the run further: stop here.
                if (width > shelfWidth) {
                    break;
                }
                height = max(height, books[j][1]);
                // Books j..i-1 form the last shelf at cost dp[j] + height.
                dp[i] = min(dp[i], dp[j] + height);
            }
        }
        return (int)dp[count];
    }
};

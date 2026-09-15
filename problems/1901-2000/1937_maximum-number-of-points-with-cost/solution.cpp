class Solution {
  public:
    long long maxPoints(vector<vector<int>> &points) {
        int m = points.size();
        int n = points[0].size();
        // dp[c] = best score with the current row's pick at column c; the
        // first row seeds it with its own point values.
        vector<long long> prev(n), left(n), right(n);
        for (int c = 0; c < n; c++)
            prev[c] = points[0][c];
        for (int r = 1; r < m; r++) {
            // Split |p - c| by direction: from the left the carry-over is
            // dp[p] + p - c, so a running max of dp[p] + p replaces the
            // quadratic predecessor rescan.
            long long best = prev[0] + 0;
            for (int c = 0; c < n; c++) {
                if (prev[c] + c > best)
                    best = prev[c] + c;
                left[c] = best;
            }
            // Mirror sweep from the right: running max of dp[p] - p, p >= c.
            best = prev[n - 1] - (n - 1);
            for (int c = n - 1; c >= 0; c--) {
                if (prev[c] - c > best)
                    best = prev[c] - c;
                right[c] = best;
            }
            // Both directions cover p == c (zero penalty), so every
            // predecessor is considered under the correct penalty sign.
            for (int c = 0; c < n; c++) {
                long long l = left[c] - c;
                long long rr = right[c] + c;
                prev[c] = points[r][c] + (l > rr ? l : rr);
            }
        }
        long long ans = prev[0];
        for (int c = 1; c < n; c++) {
            if (prev[c] > ans)
                ans = prev[c];
        }
        return ans;
    }
};

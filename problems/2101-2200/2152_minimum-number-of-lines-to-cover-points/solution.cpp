class Solution {
  public:
    int minimumLines(vector<vector<int>> &points) {
        // At most 10 points, so the set of covered points fits in a bitmask:
        // dp[covered] = fewest lines covering exactly that subset. In each
        // state the lowest uncovered point i is covered by the next line, so
        // trying i alone and every line through i and one more uncovered
        // point j exhausts every option.
        int n = points.size();
        int full = (1 << n) - 1;
        // lineMask[i][j] = all points on the straight line through i and j;
        // the cross-product comparison tests collinearity on integers, and
        // coordinates bounded by 100 keep every product well inside int.
        vector<vector<int>> lineMask(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    continue;
                }
                int dx1 = points[j][0] - points[i][0];
                int dy1 = points[j][1] - points[i][1];
                int mask = (1 << i) | (1 << j);
                for (int k = 0; k < n; k++) {
                    int dx2 = points[k][0] - points[i][0];
                    int dy2 = points[k][1] - points[i][1];
                    if (k != i && k != j && dx1 * dy2 == dy1 * dx2) {
                        mask |= 1 << k;
                    }
                }
                lineMask[i][j] = mask;
            }
        }
        int unreachable = n + 1;
        vector<int> dp(full + 1, unreachable);
        dp[0] = 0;
        for (int covered = 0; covered < full; covered++) {
            if (dp[covered] == unreachable) {
                continue;
            }
            int i = 0;
            while (covered & (1 << i)) {
                i++;
            }
            int nxt = covered | (1 << i);
            if (dp[covered] + 1 < dp[nxt]) {
                dp[nxt] = dp[covered] + 1;
            }
            for (int j = 0; j < n; j++) {
                if (j == i || covered & (1 << j)) {
                    continue;
                }
                nxt = covered | lineMask[i][j];
                if (dp[covered] + 1 < dp[nxt]) {
                    dp[nxt] = dp[covered] + 1;
                }
            }
        }
        return dp[full];
    }
};

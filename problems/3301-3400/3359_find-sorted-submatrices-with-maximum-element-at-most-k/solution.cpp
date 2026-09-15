class Solution {
  public:
    long long countSubmatrices(vector<vector<int>> &grid, int k) {
        // Sweep row by row. run[j] is the longest non-increasing run of
        // cells <= k ending at column j in the current row, so a column
        // span of width w ending at j is row-valid exactly when run[j] >=
        // w. Per column, a monotonic stack of the run lengths seen so far
        // keeps the running sum of minima over every stack segment; that
        // sum counts the submatrices whose bottom-right corner is the
        // current cell. The count reaches C(m+1,2)*C(n+1,2) ~ 2.5*10^11,
        // past 32 bits, so the sums live in long long.
        int m = grid.size();
        int n = grid[0].size();
        vector<int> stackVal((size_t)m * n);
        vector<int> stackWid((size_t)m * n);
        vector<int> tops(n, 0);
        vector<long long> sums(n, 0);
        long long total = 0;
        for (int i = 0; i < m; i++) {
            const vector<int> &row = grid[i];
            int prevVal = 0;
            int prevRun = 0;
            for (int j = 0; j < n; j++) {
                int v = row[j];
                int r;
                if (v > k) {
                    r = 0;
                } else if (prevRun > 0 && prevVal >= v) {
                    r = prevRun + 1;
                } else {
                    r = 1;
                }
                size_t base = (size_t)j * m;
                int t = tops[j];
                long long s = sums[j];
                int w = 1;
                while (t > 0 && stackVal[base + t - 1] >= r) {
                    t--;
                    s -= (long long)stackVal[base + t] * stackWid[base + t];
                    w += stackWid[base + t];
                }
                stackVal[base + t] = r;
                stackWid[base + t] = w;
                tops[j] = t + 1;
                s += (long long)r * w;
                sums[j] = s;
                total += s;
                prevVal = v;
                prevRun = r;
            }
        }
        return total;
    }
};

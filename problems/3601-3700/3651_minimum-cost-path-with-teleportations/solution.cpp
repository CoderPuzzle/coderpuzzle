class Solution {
  public:
    int minCost(vector<vector<int>> &grid, int k) {
        int m = grid.size(), n = grid[0].size();
        const long long INF = 1e18;
        // Layer 0 is the plain right/down minimum path sum: every move pays
        // its destination cell, and standing on the start costs nothing.
        vector<vector<long long>> d(m, vector<long long>(n, INF));
        d[0][0] = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 && j == 0)
                    continue;
                long long best = i > 0 ? d[i - 1][j] : INF;
                if (j > 0 && d[i][j - 1] < best)
                    best = d[i][j - 1];
                d[i][j] = best + grid[i][j];
            }
        }
        // Each further layer opens with one teleport: land anywhere whose
        // value is at least mine, at the previous layer's price of that
        // launch cell. Cells sorted by value descending turn the scan into
        // a running prefix minimum; ties share one prefix because the test
        // is >=.
        vector<pair<int, int>> cells;
        cells.reserve(m * n);
        for (int i = 0; i < m; ++i)
            for (int j = 0; j < n; ++j)
                cells.push_back({i, j});
        sort(cells.begin(), cells.end(), [&grid](const pair<int, int> &a, const pair<int, int> &b) {
            return grid[a.first][a.second] > grid[b.first][b.second];
        });
        long long answer = d[m - 1][n - 1];
        for (int step = 0; step < k; ++step) {
            vector<vector<long long>> seed(m, vector<long long>(n, INF));
            long long run = INF;
            size_t p = 0;
            for (const pair<int, int> &c : cells) {
                while (p < cells.size() && grid[cells[p].first][cells[p].second] >= grid[c.first][c.second]) {
                    long long cand = d[cells[p].first][cells[p].second];
                    if (cand < run)
                        run = cand;
                    ++p;
                }
                seed[c.first][c.second] = run;
            }
            // Then ordinary right/down moves carry each landing spot through
            // the rest of the layer, as in the plain path-sum pass above.
            for (int i = 0; i < m; ++i) {
                for (int j = 0; j < n; ++j) {
                    long long best = seed[i][j], g = grid[i][j];
                    if (i > 0 && seed[i - 1][j] + g < best)
                        best = seed[i - 1][j] + g;
                    if (j > 0 && seed[i][j - 1] + g < best)
                        best = seed[i][j - 1] + g;
                    seed[i][j] = best;
                }
            }
            d = move(seed);
            if (d[m - 1][n - 1] < answer)
                answer = d[m - 1][n - 1];
        }
        return static_cast<int>(answer);
    }
};

class Solution {
  public:
    vector<vector<int>> minScore(vector<vector<int>> &grid) {
        int m = grid.size(), n = grid[0].size();
        vector<array<int, 3>> cells;
        cells.reserve((size_t)m * n);
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                cells.push_back({grid[r][c], r, c});
            }
        }
        // Assign in ascending original order: when a cell's turn comes, every
        // smaller cell sharing its row/column is already placed, so only the
        // running maxima of that row and column constrain it.
        sort(cells.begin(), cells.end());
        vector<int> rowMax(m, 0), colMax(n, 0);
        vector<vector<int>> res(m, vector<int>(n, 0));
        for (const auto &cell : cells) {
            int r = cell[1], c = cell[2];
            // Smallest legal replacement: 1 + max of what's already in the
            // row/column; larger demands come only from unplaced cells, which
            // receive strictly larger values later by construction.
            int v = 1 + max(rowMax[r], colMax[c]);
            res[r][c] = v;
            rowMax[r] = v;
            colMax[c] = v;
        }
        return res;
    }
};

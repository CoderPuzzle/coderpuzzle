class Solution {
  public:
    int countServers(vector<vector<int>> &grid) {
        // A server communicates iff its row or its column holds another
        // server — any communicating partner must share one of those lines,
        // so tallies per line settle it without searching the pair graph.
        const int m = static_cast<int>(grid.size());
        const int n = static_cast<int>(grid[0].size());
        vector<int> row(m, 0), col(n, 0);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    row[r] += 1;
                    col[c] += 1;
                }
            }
        }
        int total = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1 && (row[r] > 1 || col[c] > 1)) {
                    total += 1;
                }
            }
        }
        return total;
    }
};

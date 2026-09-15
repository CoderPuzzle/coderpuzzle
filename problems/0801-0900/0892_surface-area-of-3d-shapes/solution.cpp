class Solution {
  public:
    int surfaceArea(vector<vector<int>> &grid) {
        // Every exposed face belongs to some tower: an occupied cell owns a
        // top and a bottom face, and each of its four walls shows exactly the
        // strip rising above the neighboring cell (empty ground or the grid's
        // edge is a neighbor of height 0).
        int n = grid.size();
        int total = 0;
        const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                int v = grid[i][j];
                if (v > 0) {
                    total += 2;
                    for (const auto &d : dirs) {
                        int ni = i + d[0];
                        int nj = j + d[1];
                        int neighbor = 0;
                        if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
                            neighbor = grid[ni][nj];
                        }
                        if (v > neighbor) {
                            total += v - neighbor;
                        }
                    }
                }
            }
        }
        return total;
    }
};

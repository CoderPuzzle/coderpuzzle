class Solution {
  public:
    vector<vector<int>> spiralMatrixIII(int rows, int cols, int rStart, int cStart) {
        // The walk is a turtle: it runs east, south, west, north, east, ...
        // in turn, and every second turn the straight runs grow by one step
        // (1, 1, 2, 2, 3, 3, ...). A step that lands outside the grid is
        // still taken — the spiral reaches the far cells only by leaving
        // and re-entering — but only in-grid positions are recorded, and
        // once rows * cols of them are, the whole grid is visited and the
        // walk stops.
        int total = rows * cols;
        vector<vector<int>> order{{rStart, cStart}};
        const int directions[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int r = rStart;
        int c = cStart;
        int d = 0;
        int step = 1;
        while ((int)order.size() < total) {
            for (int side = 0; side < 2; ++side) {
                for (int i = 0; i < step; ++i) {
                    r += directions[d][0];
                    c += directions[d][1];
                    if (0 <= r && r < rows && 0 <= c && c < cols) {
                        order.push_back({r, c});
                    }
                }
                d = (d + 1) % 4;
            }
            ++step;
        }
        return order;
    }
};

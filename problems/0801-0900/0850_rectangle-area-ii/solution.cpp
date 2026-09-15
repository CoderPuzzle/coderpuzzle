class Solution {
  public:
    int rectangleArea(vector<vector<int>> &rectangles) {
        const long long MOD = 1000000007LL;
        if (rectangles.empty())
            return 0;
        // Coordinate compression: with at most 2R distinct values per
        // axis, cell boundaries are exactly the rectangle edges, so
        // coverage is constant within each cell.
        set<long long> xsSet, ysSet;
        for (auto &rect : rectangles) {
            xsSet.insert(rect[0]);
            xsSet.insert(rect[2]);
            ysSet.insert(rect[1]);
            ysSet.insert(rect[3]);
        }
        vector<long long> xs(xsSet.begin(), xsSet.end());
        vector<long long> ys(ysSet.begin(), ysSet.end());
        map<long long, int> xIndex, yIndex;
        for (int i = 0; i < (int)xs.size(); i++)
            xIndex[xs[i]] = i;
        for (int i = 0; i < (int)ys.size(); i++)
            yIndex[ys[i]] = i;
        int nx = xs.size() - 1;
        int ny = ys.size() - 1;
        vector<vector<char>> grid(nx, vector<char>(ny, 0));
        // Mark the half-open compressed range: adjacent rectangles
        // share edge cells without overlap or gaps, and idempotent
        // marking counts overlaps once.
        for (auto &rect : rectangles) {
            for (int i = xIndex[rect[0]]; i < xIndex[rect[2]]; i++) {
                for (int j = yIndex[rect[1]]; j < yIndex[rect[3]]; j++) {
                    grid[i][j] = 1;
                }
            }
        }
        // Sum the real areas of marked cells, reducing at each step.
        long long total = 0;
        for (int i = 0; i < nx; i++) {
            for (int j = 0; j < ny; j++) {
                if (grid[i][j]) {
                    long long dx = (xs[i + 1] - xs[i]) % MOD;
                    long long dy = (ys[j + 1] - ys[j]) % MOD;
                    total = (total + dx * dy) % MOD;
                }
            }
        }
        return (int)total;
    }
};

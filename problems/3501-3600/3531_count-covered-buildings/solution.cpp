class Solution {
  public:
    int countCoveredBuildings(int n, vector<vector<int>> &buildings) {
        // Per x-line: extreme y values; per y-line: extreme x values. A
        // building is covered exactly when it is strictly inside both.
        vector<int> rowMinY(n + 1, n + 1), rowMaxY(n + 1, 0);
        vector<int> colMinX(n + 1, n + 1), colMaxX(n + 1, 0);
        for (auto &b : buildings) {
            int x = b[0], y = b[1];
            rowMinY[x] = min(rowMinY[x], y);
            rowMaxY[x] = max(rowMaxY[x], y);
            colMinX[y] = min(colMinX[y], x);
            colMaxX[y] = max(colMaxX[y], x);
        }
        int covered = 0;
        for (auto &b : buildings) {
            int x = b[0], y = b[1];
            if (rowMinY[x] < y && y < rowMaxY[x] && colMinX[y] < x && x < colMaxX[y])
                covered++;
        }
        return covered;
    }
};

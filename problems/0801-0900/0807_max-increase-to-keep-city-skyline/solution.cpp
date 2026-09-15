class Solution {
  public:
    int maxIncreaseKeepingSkyline(vector<vector<int>> &grid) {
        // Seen along one axis of the city, every row collapses to its
        // tallest building, and seen along the other, every column does —
        // those 2n maxima are all four skylines hold. A raise is safe
        // exactly while the building stays at or below both of its
        // maxima, so the shorter of the two is each cell's ceiling and
        // the answer is the total gap below it.
        int n = grid.size();
        vector<int> rowMax(n), colMax(n);
        for (int r = 0; r < n; ++r) {
            rowMax[r] = grid[r][0];
            for (int c = 1; c < n; ++c) {
                rowMax[r] = max(rowMax[r], grid[r][c]);
            }
        }
        for (int c = 0; c < n; ++c) {
            colMax[c] = grid[0][c];
            for (int r = 1; r < n; ++r) {
                colMax[c] = max(colMax[c], grid[r][c]);
            }
        }
        int total = 0;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                total += min(rowMax[r], colMax[c]) - grid[r][c];
            }
        }
        return total;
    }
};

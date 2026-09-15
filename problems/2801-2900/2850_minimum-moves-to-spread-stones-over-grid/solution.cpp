class Solution {
  public:
    int minimumMoves(vector<vector<int>> &grid) {
        // Pair every empty cell with a cell still holding at least two
        // stones; the cost of a pair is the Manhattan distance between the
        // cells, and backtracking over all donor choices finds the cheapest
        // perfect pairing.
        vector<pair<int, int>> empties;
        for (int i = 0; i < 3; i++)
            for (int c = 0; c < 3; c++)
                if (grid[i][c] == 0)
                    empties.push_back({i, c});
        return fill(grid, empties, 0);
    }

  private:
    int fill(vector<vector<int>> &grid, vector<pair<int, int>> &empties, int k) {
        if (k == (int)empties.size())
            return 0;
        int i = empties[k].first;
        int j = empties[k].second;
        int best = 99;
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                if (grid[r][c] >= 2) {
                    grid[r][c]--;
                    best = min(best, abs(i - r) + abs(j - c) + fill(grid, empties, k + 1));
                    grid[r][c]++;
                }
            }
        }
        return best;
    }
};

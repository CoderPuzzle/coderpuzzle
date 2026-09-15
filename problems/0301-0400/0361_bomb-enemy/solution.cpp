class Solution {
  public:
    int maxKilledEnemies(vector<vector<string>> &grid) {
        // A bomb planted on an empty cell kills along its row and column
        // until a wall, so its reach is the two wall-free segments crossing
        // the cell. Every empty cell in a segment shares that segment's
        // enemies: count each segment once and reuse the count.
        int m = grid.size();
        int n = grid[0].size();
        vector<int> colHits(n, 0);
        int best = 0;
        for (int i = 0; i < m; i++) {
            int rowHits = 0;
            for (int j = 0; j < n; j++) {
                // First cell of a row segment (after a wall or at the left
                // edge): one scan counts the enemies up to the next wall.
                if (j == 0 || grid[i][j - 1] == "W")
                    rowHits = countRow(grid, i, j);
                // Same lazily per column: recount only when the cell above
                // is a wall or the top edge.
                if (i == 0 || grid[i - 1][j] == "W")
                    colHits[j] = countCol(grid, i, j);
                if (grid[i][j] == "0")
                    best = max(best, rowHits + colHits[j]);
            }
        }
        return best;
    }

  private:
    // Enemies in row i from column j up to the next wall.
    int countRow(vector<vector<string>> &grid, int i, int j) {
        int hits = 0;
        for (int k = j; k < (int)grid[i].size() && grid[i][k] != "W"; k++)
            if (grid[i][k] == "E")
                hits++;
        return hits;
    }

    // Enemies in column j from row i down to the next wall.
    int countCol(vector<vector<string>> &grid, int i, int j) {
        int hits = 0;
        for (int k = i; k < (int)grid.size() && grid[k][j] != "W"; k++)
            if (grid[k][j] == "E")
                hits++;
        return hits;
    }
};

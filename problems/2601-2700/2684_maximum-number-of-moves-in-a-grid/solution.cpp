class Solution {
  public:
    int maxMoves(vector<vector<int>> &grid) {
        int rows = static_cast<int>(grid.size());
        int columns = static_cast<int>(grid[0].size());
        vector<bool> reachable(rows, true);
        int moves = 0;
        for (int column = 0; column + 1 < columns; column++) {
            vector<bool> next_reachable(rows, false);
            int reached = 0;
            for (int row = 0; row < rows; row++) {
                if (!reachable[row]) {
                    continue;
                }
                int value = grid[row][column];
                for (int target = max(0, row - 1); target < min(rows, row + 2); target++) {
                    if (!next_reachable[target] && grid[target][column + 1] > value) {
                        next_reachable[target] = true;
                        reached++;
                    }
                }
            }
            if (reached == 0) {
                break;
            }
            reachable = next_reachable;
            moves++;
        }
        return moves;
    }
};

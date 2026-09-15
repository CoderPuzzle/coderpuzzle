class Solution {
  public:
    int countUnguarded(int m, int n, vector<vector<int>> &guards, vector<vector<int>> &walls) {
        enum { WALL = 1, GUARD = 2, GUARDED = 3 };
        vector<vector<int>> grid(m, vector<int>(n, 0));
        for (auto &wall : walls) {
            grid[wall[0]][wall[1]] = WALL;
        }
        for (auto &guard : guards) {
            grid[guard[0]][guard[1]] = GUARD;
        }
        for (auto &guard : guards) {
            for (auto &d : {pair{1, 0}, pair{-1, 0}, pair{0, 1}, pair{0, -1}}) {
                int row = guard[0] + d.first, col = guard[1] + d.second;
                while (row >= 0 && row < m && col >= 0 && col < n && grid[row][col] != WALL &&
                       grid[row][col] != GUARD) {
                    grid[row][col] = GUARDED;
                    row += d.first;
                    col += d.second;
                }
            }
        }
        int count = 0;
        for (auto &row : grid) {
            for (int cell : row) {
                if (cell == 0) {
                    count++;
                }
            }
        }
        return count;
    }
};

class Solution {
  public:
    int numIslands(vector<vector<string>> &grid) {
        int rows = grid.size();
        if (rows == 0)
            return 0;
        int cols = grid[0].size();
        vector<vector<char>> visited(rows, vector<char>(cols, 0));
        int count = 0;
        int dx[] = {1, -1, 0, 0};
        int dy[] = {0, 0, 1, -1};
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == "1" && !visited[r][c]) {
                    count++;
                    vector<pair<int, int>> stack;
                    stack.push_back({r, c});
                    visited[r][c] = 1;
                    while (!stack.empty()) {
                        auto [x, y] = stack.back();
                        stack.pop_back();
                        for (int k = 0; k < 4; k++) {
                            int nx = x + dx[k], ny = y + dy[k];
                            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] == "1" &&
                                !visited[nx][ny]) {
                                visited[nx][ny] = 1;
                                stack.push_back({nx, ny});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
};

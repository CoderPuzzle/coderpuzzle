class Solution {
  public:
    bool containsCycle(vector<vector<string>> &grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        vector<vector<char>> visited(rows, vector<char>(cols, 0));
        int dx[] = {1, -1, 0, 0};
        int dy[] = {0, 0, 1, -1};
        for (int r0 = 0; r0 < rows; r0++) {
            for (int c0 = 0; c0 < cols; c0++) {
                if (visited[r0][c0])
                    continue;
                visited[r0][c0] = 1;
                vector<array<int, 4>> stack;
                stack.push_back({r0, c0, -1, -1});
                while (!stack.empty()) {
                    auto [x, y, px, py] = stack.back();
                    stack.pop_back();
                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];
                        if (nx < 0 || nx >= rows || ny < 0 || ny >= cols)
                            continue;
                        if (grid[nx][ny] != grid[x][y])
                            continue;
                        if (nx == px && ny == py)
                            continue;
                        if (visited[nx][ny])
                            return true;
                        visited[nx][ny] = 1;
                        stack.push_back({nx, ny, x, y});
                    }
                }
            }
        }
        return false;
    }
};

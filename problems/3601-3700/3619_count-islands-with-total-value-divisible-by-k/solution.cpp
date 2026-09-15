class Solution {
  public:
    int countIslands(vector<vector<int>> &grid, int k) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<char>> seen(m, vector<char>(n, 0));
        // Iterative BFS: an island can span all 1e5 cells, so no recursion.
        // One shared queue buffer; each island's flood fill starts over.
        vector<pair<int, int>> queue;
        const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        int count = 0;
        for (int si = 0; si < m; ++si) {
            for (int sj = 0; sj < n; ++sj) {
                if (grid[si][sj] == 0 || seen[si][sj])
                    continue;
                // An island total reaches 1e5 cells * 1e6 = 1e11, past the
                // 32-bit range, so the sum accumulates in 64 bits.
                long long total = 0;
                queue.clear();
                queue.push_back({si, sj});
                seen[si][sj] = 1;
                for (size_t head = 0; head < queue.size(); ++head) {
                    auto [x, y] = queue[head];
                    total += grid[x][y];
                    for (auto &d : dirs) {
                        int nx = x + d[0], ny = y + d[1];
                        if (nx < 0 || nx >= m || ny < 0 || ny >= n)
                            continue;
                        if (grid[nx][ny] == 0 || seen[nx][ny])
                            continue;
                        seen[nx][ny] = 1;
                        queue.push_back({nx, ny});
                    }
                }
                if (total % k == 0)
                    ++count;
            }
        }
        return count;
    }
};

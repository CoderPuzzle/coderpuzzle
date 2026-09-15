class Solution {
  public:
    vector<vector<int>> findPath(vector<vector<int>> &grid, int k) {
        // Backtrack over the walk, entering waypoint w only as the w-th
        // waypoint. Two prunes keep the 5x5 worst case instant: the
        // remaining cells must still balance by color (the walk strictly
        // alternates colors), and the unvisited region must stay connected.
        m = static_cast<int>(grid.size());
        n = static_cast<int>(grid[0].size());
        total = m * n;
        this->grid = &grid;
        visited.assign(m, vector<bool>(n, false));
        remaining[0] = remaining[1] = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                ++remaining[(r + c) % 2];
            }
        }
        path.assign(total, vector<int>(2));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if ((grid[r][c] == 0 || grid[r][c] == 1) && dfs(r, c, 0, 1)) {
                    return path;
                }
            }
        }
        return {};
    }

  private:
    int m, n, total;
    vector<vector<int>> *grid;
    vector<vector<bool>> visited;
    int remaining[2];
    vector<vector<int>> path;
    static constexpr int DELTAS[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    bool connected() {
        int unvisitedCount = 0;
        int start = -1;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (!visited[r][c]) {
                    ++unvisitedCount;
                    start = r * n + c;
                }
            }
        }
        if (unvisitedCount == 0) {
            return true;
        }
        vector<bool> seen(m * n, false);
        seen[start] = true;
        vector<int> stack{start};
        int reached = 0;
        while (!stack.empty()) {
            int flat = stack.back();
            stack.pop_back();
            ++reached;
            int r = flat / n;
            int c = flat % n;
            for (auto &delta : DELTAS) {
                int nr = r + delta[0];
                int nc = c + delta[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && !seen[nr * n + nc]) {
                    seen[nr * n + nc] = true;
                    stack.push_back(nr * n + nc);
                }
            }
        }
        return reached == unvisitedCount;
    }

    bool dfs(int r, int c, int count, int nxt) {
        int value = (*grid)[r][c];
        if (value != 0 && value != nxt) {
            return false;
        }
        visited[r][c] = true;
        path[count] = {r, c};
        if (value == nxt) {
            ++nxt;
        }
        ++count;
        int color = (r + c) % 2;
        --remaining[color];
        bool ok = false;
        if (count == total) {
            ok = true;
        } else {
            int left = total - count;
            // The rest of the walk alternates colors, starting on the
            // opposite color of the current cell.
            if (remaining[1 - color] == (left + 1) / 2 && remaining[color] == left / 2 && connected()) {
                for (auto &delta : DELTAS) {
                    int nr = r + delta[0];
                    int nc = c + delta[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && dfs(nr, nc, count, nxt)) {
                        ok = true;
                        break;
                    }
                }
            }
        }
        if (!ok) {
            visited[r][c] = false;
        }
        ++remaining[color];
        return ok;
    }
};

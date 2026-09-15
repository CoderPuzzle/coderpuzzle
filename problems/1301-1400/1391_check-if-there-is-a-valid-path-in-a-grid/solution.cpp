#include <array>
#include <queue>
#include <utility>
#include <vector>

class Solution {
  public:
    bool hasValidPath(vector<vector<int>> &grid) {
        // Each street type is the set of sides it opens. A move between
        // neighbouring cells is legal only when the source opens the shared
        // side AND the target opens the opposite side, so a plain BFS from
        // (0,0) over those mutual connections decides reachability.
        const array<int, 7> sideA = {0, 0, 2, 0, 1, 0, 1};
        const array<int, 7> sideB = {0, 1, 3, 3, 3, 2, 2};
        const array<pair<int, int>, 4> step = {{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}};
        const array<int, 4> opposite = {1, 0, 3, 2};
        int m = grid.size();
        int n = grid[0].size();
        auto opens = [&](int street, int side) { return sideA[street] == side || sideB[street] == side; };
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        queue<pair<int, int>> pending;
        pending.push({0, 0});
        visited[0][0] = true;
        while (!pending.empty()) {
            auto [row, col] = pending.front();
            pending.pop();
            if (row == m - 1 && col == n - 1) {
                return true;
            }
            int street = grid[row][col];
            for (int side : {sideA[street], sideB[street]}) {
                int nr = row + step[side].first;
                int nc = col + step[side].second;
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
                    continue;
                }
                if (opens(grid[nr][nc], opposite[side])) {
                    visited[nr][nc] = true;
                    pending.push({nr, nc});
                }
            }
        }
        return false;
    }
};

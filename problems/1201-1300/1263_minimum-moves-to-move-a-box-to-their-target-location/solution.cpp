#include <deque>
#include <set>

class Solution {
  public:
    int minPushBox(vector<vector<string>> &grid) {
        const int m = static_cast<int>(grid.size());
        const int n = static_cast<int>(grid[0].size());
        int boxR = 0, boxC = 0, playR = 0, playC = 0, targR = 0, targC = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == "B") {
                    boxR = r;
                    boxC = c;
                } else if (grid[r][c] == "S") {
                    playR = r;
                    playC = c;
                } else if (grid[r][c] == "T") {
                    targR = r;
                    targC = c;
                }
            }
        }
        auto freeCell = [&](int r, int c) { return r >= 0 && r < m && c >= 0 && c < n && grid[r][c] != "#"; };
        // Flood the player's reachable floor with the box as an obstacle.
        auto reachable = [&](int br, int bc, int sr, int sc, vector<vector<bool>> &seen) {
            deque<pair<int, int>> q;
            seen[sr][sc] = true;
            q.push_back({sr, sc});
            while (!q.empty()) {
                auto [r, c] = q.front();
                q.pop_front();
                for (auto &d : DELTAS) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                        continue;
                    if ((nr == br && nc == bc) || seen[nr][nc] || grid[nr][nc] == "#") {
                        continue;
                    }
                    seen[nr][nc] = true;
                    q.push_back({nr, nc});
                }
            }
        };

        // State: (box cell, side of the player). After a push along
        // DELTAS[i] the player ends up standing on side i of the new box
        // cell. Each edge is one push, so BFS yields minimal pushes.
        set<long long> visited;
        deque<tuple<int, int, int, int>> q; // br bc side pushes
        vector<vector<bool>> around(m, vector<bool>(n, false));
        reachable(boxR, boxC, playR, playC, around);
        for (int i = 0; i < 4; ++i) {
            int standR = boxR + DELTAS[i][0], standC = boxC + DELTAS[i][1];
            int destR = boxR - DELTAS[i][0], destC = boxC - DELTAS[i][1];
            if (!freeCell(standR, standC) || !freeCell(destR, destC))
                continue;
            if (!around[standR][standC])
                continue;
            long long key = ((long long)(destR * n + destC) << 2) | i;
            visited.insert(key);
            q.push_back({destR, destC, i, 1});
        }
        while (!q.empty()) {
            auto [br, bc, side, pushes] = q.front();
            q.pop_front();
            if (br == targR && bc == targC)
                return pushes;
            vector<vector<bool>> seen(m, vector<bool>(n, false));
            reachable(br, bc, br + DELTAS[side][0], bc + DELTAS[side][1], seen);
            for (int i = 0; i < 4; ++i) {
                int standR = br + DELTAS[i][0], standC = bc + DELTAS[i][1];
                int destR = br - DELTAS[i][0], destC = bc - DELTAS[i][1];
                if (!freeCell(standR, standC) || !freeCell(destR, destC))
                    continue;
                if (!seen[standR][standC])
                    continue;
                long long key = ((long long)(destR * n + destC) << 2) | i;
                if (visited.count(key))
                    continue;
                visited.insert(key);
                q.push_back({destR, destC, i, pushes + 1});
            }
        }
        return -1;
    }

  private:
    static constexpr int DELTAS[4][2] = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
};

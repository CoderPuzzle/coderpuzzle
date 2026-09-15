class Solution {
  public:
    vector<vector<int>> wallsAndGates(vector<vector<int>> &rooms) {
        const int INF = 2147483647;
        int m = rooms.size();
        int n = rooms[0].size();
        // Invert the search: enqueue every gate at once and run one BFS
        // outward, rather than searching from each empty room.
        queue<pair<int, int>> q;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (rooms[r][c] == 0) {
                    q.push({r, c});
                }
            }
        }
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        int dist = 0;
        while (!q.empty()) {
            // Expand one whole layer per step: every distance-d cell is
            // found before any d+1 cell is labeled, which is what keeps
            // distances minimal (first reach = shortest path from a gate).
            dist++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [r, c] = q.front();
                q.pop();
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];
                    // Still INF means unvisited; writing the distance doubles
                    // as the visited mark, and walls/gates never match INF
                    // so they are never entered or overwritten.
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == INF) {
                        rooms[nr][nc] = dist;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return rooms;
    }
};

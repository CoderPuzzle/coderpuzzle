class Solution {
  public:
    // BFS: minimum knight moves from (sx, sy) to every square.
    vector<vector<int>> knightDistances(int sx, int sy) {
        static const int DX[8] = {-2, -2, -1, -1, 1, 1, 2, 2};
        static const int DY[8] = {-1, 1, -2, 2, -2, 2, -1, 1};
        vector<vector<int>> dist(50, vector<int>(50, -1));
        dist[sx][sy] = 0;
        deque<pair<int, int>> queue = {{sx, sy}};
        while (!queue.empty()) {
            pair<int, int> front = queue.front();
            queue.pop_front();
            int x = front.first, y = front.second;
            int d = dist[x][y];
            for (int k = 0; k < 8; k++) {
                int nx = x + DX[k], ny = y + DY[k];
                if (nx >= 0 && nx < 50 && ny >= 0 && ny < 50 && dist[nx][ny] < 0) {
                    dist[nx][ny] = d + 1;
                    queue.push_back(make_pair(nx, ny));
                }
            }
        }
        return dist;
    }

    int maxMoves(int kx, int ky, vector<vector<int>> &positions) {
        int m = (int)positions.size();
        vector<vector<vector<int>>> grids(m);
        for (int i = 0; i < m; i++) {
            grids[i] = knightDistances(positions[i][0], positions[i][1]);
        }
        vector<int> dStart(m);
        vector<vector<int>> dist(m, vector<int>(m));
        for (int i = 0; i < m; i++) {
            dStart[i] = grids[i][kx][ky];
            for (int j = 0; j < m; j++) {
                dist[i][j] = grids[j][positions[i][0]][positions[i][1]];
            }
        }

        int full = (1 << m) - 1;
        // dp[mask][last]: best total remaining moves with `mask` captured and
        // the knight on pawn `last`. Alice maximizes on even popcount.
        vector<vector<int>> dp(full + 1, vector<int>(m, 0));
        for (int mask = full - 1; mask >= 1; mask--) {
            int bits = __builtin_popcount(mask);
            bool maximize = bits % 2 == 0;
            for (int last = 0; last < m; last++) {
                int best = maximize ? -1 : INT_MAX;
                for (int j = 0; j < m; j++) {
                    if (mask & (1 << j))
                        continue;
                    int cand = dist[last][j] + dp[mask | (1 << j)][j];
                    if (maximize) {
                        if (cand > best)
                            best = cand;
                    } else {
                        if (cand < best)
                            best = cand;
                    }
                }
                dp[mask][last] = best;
            }
        }

        int best = -1;
        for (int j = 0; j < m; j++) {
            int cand = dStart[j] + dp[1 << j][j];
            if (cand > best)
                best = cand;
        }
        return best;
    }
};

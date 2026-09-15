class Solution {
  public:
    int maximumMinutes(vector<vector<int>> &grid) {
        int m = grid.size();
        int n = grid[0].size();
        const int INF = INT_MAX / 2; // above every reachable time (including 1e9 waits)
        const int di[4] = {1, -1, 0, 0};
        const int dj[4] = {0, 0, 1, -1};

        // fire spread is independent of where you walk: one multi-source BFS
        // gives fire[i][j] = earliest minute fire occupies each cell
        vector<vector<int>> fire(m, vector<int>(n, INF));
        vector<pair<int, int>> queue;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    fire[i][j] = 0;
                    queue.push_back({i, j});
                }
            }
        }
        for (size_t head = 0; head < queue.size(); head++) {
            auto [i, j] = queue[head];
            for (int d = 0; d < 4; d++) {
                int ni = i + di[d];
                int nj = j + dj[d];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != 2 && fire[ni][nj] == INF) {
                    fire[ni][nj] = fire[i][j] + 1;
                    queue.push_back({ni, nj});
                }
            }
        }

        auto can_reach = [&](int wait) {
            // the start cell must still be fire-free the moment you set out
            if (wait >= fire[0][0]) {
                return false;
            }
            vector<vector<bool>> seen(m, vector<bool>(n, false));
            seen[0][0] = true;
            vector<array<int, 3>> dq;
            dq.push_back({0, 0, wait});
            for (size_t head = 0; head < dq.size(); head++) {
                auto [i, j, t] = dq[head];
                if (i == m - 1 && j == n - 1) {
                    return true;
                }
                for (int d = 0; d < 4; d++) {
                    int ni = i + di[d];
                    int nj = j + dj[d];
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != 2 && !seen[ni][nj]) {
                        int nt = t + 1;
                        // the safehouse may tie the fire: reaching it the very
                        // minute fire does still counts as escaping
                        if (ni == m - 1 && nj == n - 1) {
                            if (nt <= fire[ni][nj]) {
                                seen[ni][nj] = true;
                                dq.push_back({ni, nj, nt});
                            }
                        } else {
                            // you move, then fire spreads: an ordinary cell is
                            // safe only if fire arrives strictly later than you
                            if (nt < fire[ni][nj]) {
                                seen[ni][nj] = true;
                                dq.push_back({ni, nj, nt});
                            }
                        }
                    }
                }
            }
            return false;
        };

        // sentinels first: -1 if even waiting 0 fails; the 1e9 sentinel means
        // fire can never pin you down. Survivability is monotone in wait, so
        // binary search the largest survivable wait.
        if (!can_reach(0)) {
            return -1;
        }
        if (can_reach(1000000000)) {
            return 1000000000;
        }

        int lo = 0, hi = 1000000000;
        while (lo < hi) {
            // upper mid: when survivable, lo moves up to mid without stalling
            int mid = lo + (hi - lo + 1) / 2;
            if (can_reach(mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
};

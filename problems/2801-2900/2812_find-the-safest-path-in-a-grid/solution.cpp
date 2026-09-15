class Solution {
  public:
    int maximumSafenessFactor(vector<vector<int>> &grid) {
        int n = grid.size();
        // Multi-source BFS from every thief at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest thief —
        // exactly the cell's safeness value.
        vector<vector<int>> dist(n, vector<int>(n, -1));
        vector<pair<int, int>> q;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    dist[r][c] = 0;
                    q.push_back({r, c});
                }
            }
        }
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        for (size_t head = 0; head < q.size(); head++) {
            int r = q[head].first, c = q[head].second;
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push_back({nr, nc});
                }
            }
        }

        // A path has factor >= threshold iff the corners stay connected
        // after deleting cells with dist < threshold, and that reachability
        // is monotone in the threshold — so binary search the largest
        // feasible v over [0, 2n]. A thief on a corner pins its dist to 0,
        // capping the answer at 0.
        int lo = 0, hi = 2 * n, ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (reachable(dist, n, mid)) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }

  private:
    bool reachable(vector<vector<int>> &dist, int n, int threshold) {
        // Endpoints below the threshold can never connect; otherwise a
        // plain BFS over cells with dist >= threshold decides.
        if (dist[0][0] < threshold || dist[n - 1][n - 1] < threshold) {
            return false;
        }
        vector<vector<bool>> seen(n, vector<bool>(n, false));
        seen[0][0] = true;
        vector<pair<int, int>> dq;
        dq.push_back({0, 0});
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        for (size_t head = 0; head < dq.size(); head++) {
            int r = dq[head].first, c = dq[head].second;
            if (r == n - 1 && c == n - 1) {
                return true;
            }
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] && dist[nr][nc] >= threshold) {
                    seen[nr][nc] = true;
                    dq.push_back({nr, nc});
                }
            }
        }
        return false;
    }
};

class Solution {
  public:
    long long numberOfRoutes(vector<string> &grid, int d) {
        const long long MOD = 1'000'000'007LL;
        int n = grid.size();
        int m = grid[0].size();
        // up[c]: ways standing on (r, c) after an arrival from below (or the
        // start); same_: ways standing there after a same-row slide. A slide
        // may not follow another slide, so slides feed only from up.
        vector<long long> up(m);
        for (int c = 0; c < m; ++c)
            up[c] = grid[n - 1][c] == '.' ? 1 : 0;

        auto slides_of = [&](const vector<long long> &up_values, int row) {
            // Prefix sums over the row's up-values; the Euclidean bound for
            // a same-row move is |dc| <= d (dr = 0).
            vector<long long> pref(m + 1, 0);
            for (int v = 0; v < m; ++v) {
                if (grid[row][v] == '.')
                    pref[v + 1] = (pref[v] + up_values[v]) % MOD;
                else
                    pref[v + 1] = pref[v];
            }
            vector<long long> out(m, 0);
            for (int c = 0; c < m; ++c) {
                if (grid[row][c] != '.')
                    continue;
                int lo = max(0, c - d), hi = min(m - 1, c + d);
                out[c] = ((pref[hi + 1] - pref[lo] - up_values[c]) % MOD + MOD) % MOD;
            }
            return out;
        };

        // An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
        // floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
        int w_up = (int)floor(sqrt((double)d * d - 1));
        vector<long long> same_ = slides_of(up, n - 1);
        for (int r = n - 2; r >= 0; --r) {
            // Every way of standing anywhere in row r+1 may step up into
            // row r's window around column c.
            vector<long long> pref(m + 1, 0);
            for (int v = 0; v < m; ++v) {
                if (grid[r + 1][v] == '.')
                    pref[v + 1] = (pref[v] + up[v] + same_[v]) % MOD;
                else
                    pref[v + 1] = pref[v];
            }
            vector<long long> new_up(m, 0);
            for (int c = 0; c < m; ++c) {
                if (grid[r][c] != '.')
                    continue;
                int lo = max(0, c - w_up), hi = min(m - 1, c + w_up);
                new_up[c] = ((pref[hi + 1] - pref[lo]) % MOD + MOD) % MOD;
            }
            same_ = slides_of(new_up, r);
            up = move(new_up);
        }
        long long ans = 0;
        for (int c = 0; c < m; ++c) {
            if (grid[0][c] == '.')
                ans = (ans + up[c] + same_[c]) % MOD;
        }
        return ans;
    }
};

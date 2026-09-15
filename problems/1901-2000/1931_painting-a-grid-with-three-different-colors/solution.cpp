class Solution {
  public:
    int colorTheGrid(int m, int n) {
        const long long MOD = 1000000007LL;

        // Enumerate all valid column colorings (adjacent rows differ).
        vector<vector<int>> states;
        int total = 1;
        for (int r = 0; r < m; r++)
            total *= 3;
        for (int code = 0; code < total; ++code) {
            vector<int> col(m);
            int c = code;
            for (int r = 0; r < m; r++) {
                col[r] = c % 3;
                c /= 3;
            }
            bool ok = true;
            for (int r = 0; r + 1 < m; r++) {
                if (col[r] == col[r + 1])
                    ok = false;
            }
            if (ok)
                states.push_back(col);
        }

        int len = states.size();
        // Two columns may be adjacent exactly when they differ in every row;
        // precompute that compatibility table once.
        vector<vector<int>> compat(len);
        for (int i = 0; i < len; i++) {
            for (int j = 0; j < len; j++) {
                bool ok = true;
                for (int r = 0; r < m; r++) {
                    if (states[i][r] == states[j][r])
                        ok = false;
                }
                if (ok)
                    compat[i].push_back(j);
            }
        }

        // All ones: the first column can take any valid coloring (this also
        // makes n=1 fall out with the loop body never running).
        vector<long long> cur(len, 1);
        for (int step = 0; step < n - 1; step++) {
            vector<long long> nxt(len, 0);
            for (int i = 0; i < len; i++) {
                if (cur[i]) { // skip zero-count states as a constant-factor saving
                    for (int j : compat[i]) {
                        nxt[j] = (nxt[j] + cur[i]) % MOD;
                    }
                }
            }
            cur = nxt;
        }
        // The last column may end in any state, so sum the whole vector.
        long long ans = 0;
        for (long long c : cur)
            ans = (ans + c) % MOD;
        return (int)ans;
    }
};

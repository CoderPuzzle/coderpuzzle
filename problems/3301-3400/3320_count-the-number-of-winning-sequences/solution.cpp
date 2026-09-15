class Solution {
  public:
    int countWinningSequences(string s) {
        // Rows are Bob's last move; columns are diff = Bob's points minus
        // Alice's, shifted by n + 1 so -n..n indexes 0..2n+2. Each round,
        // target row t is fed by the two other rows — both moved by the
        // same delta(t, alice) — so one elementwise add plus one shifted
        // copy advances every diff at once, keeping the bottom-up pass at
        // O(n^2) with no recursion.
        const long long MOD = 1'000'000'007;
        int delta[3][3] = {{0, -1, 1}, {1, 0, -1}, {-1, 1, 0}}; // target x alice
        int n = (int)s.size();
        int offset = n + 1;
        int width = 2 * n + 3;
        vector<vector<long long>> dp(3, vector<long long>(width, 0));
        for (int m = 0; m < 3; ++m) {
            dp[m][offset + delta[m][code(s[0])]] = 1;
        }
        for (int i = 1; i < n; ++i) {
            int a = code(s[i]);
            vector<vector<long long>> ndp(3, vector<long long>(width, 0));
            for (int t = 0; t < 3; ++t) {
                int u = (t + 1) % 3;
                int v = (t + 2) % 3;
                int d = delta[t][a];
                for (int j = 0; j < width; ++j) {
                    int nj = j + d;
                    if (nj < 0 || nj >= width)
                        continue;
                    long long value = dp[u][j] + dp[v][j];
                    if (value >= MOD)
                        value -= MOD;
                    ndp[t][nj] = value;
                }
            }
            dp = move(ndp);
        }
        long long total = 0;
        for (int m = 0; m < 3; ++m) {
            for (int j = offset + 1; j < width; ++j) {
                total += dp[m][j];
            }
        }
        return (int)(total % MOD);
    }

  private:
    static int code(char c) { return c == 'F' ? 0 : c == 'W' ? 1 : 2; }
};

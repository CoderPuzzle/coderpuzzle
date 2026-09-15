class Solution {
  public:
    int numMusicPlaylists(int n, int goal, int k) {
        // dp[i][j] counts playlists of length i that use exactly j distinct
        // songs. Play i introduces a new song — n - j + 1 choices left, so
        // dp[i-1][j-1] * (n - j + 1) — or repeats a used one: the last k
        // plays are pairwise distinct, because two occurrences of one song
        // closer than k would already violate the window, so exactly
        // min(k, j) used songs are blocked and max(0, j - k) remain,
        // giving dp[i-1][j] * (j - k). Row i reads only row i-1, so one
        // rolling row carries the table; the answer is dp[goal][n].
        constexpr long long MOD = 1'000'000'007;
        vector<long long> prev(n + 1, 0);
        prev[0] = 1;
        for (int i = 1; i <= goal; ++i) {
            vector<long long> cur(n + 1, 0);
            for (int j = 1; j <= i && j <= n; ++j) {
                long long total = prev[j - 1] * (n - j + 1);
                if (j > k) {
                    total += prev[j] * (j - k);
                }
                cur[j] = total % MOD;
            }
            prev = cur;
        }
        return (int)prev[n];
    }
};

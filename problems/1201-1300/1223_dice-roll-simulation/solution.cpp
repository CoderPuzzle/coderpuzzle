class Solution {
  public:
    int dieSimulator(int n, vector<int> &rollMax) {
        const long long MOD = 1000000007LL;
        // dp[j][c]: sequences of the current length ending with face j
        // repeated exactly c times (rollMax[i] <= 15, so 16 columns suffice)
        vector<vector<long long>> dp(6, vector<long long>(16, 0));
        // base: one single-roll sequence per face
        for (int j = 0; j < 6; j++)
            dp[j][1] = 1;
        for (int step = 2; step <= n; step++) {
            vector<vector<long long>> nxt(6, vector<long long>(16, 0));
            // per-face totals and grand total, from the previous table
            long long totals[6] = {0, 0, 0, 0, 0, 0};
            long long grand = 0;
            for (int j = 0; j < 6; j++) {
                for (int c = 0; c < 16; c++)
                    totals[j] += dp[j][c];
                grand += totals[j];
            }
            for (int j = 0; j < 6; j++) {
                int limit = rollMax[j];
                // extending a run shifts counts up one column; never writing
                // past rollMax[j] is what keeps overlong runs impossible
                for (int c = 2; c <= limit; c++) {
                    nxt[j][c] = dp[j][c - 1];
                }
                // fresh run of face j: any sequence ending in a different face
                nxt[j][1] = ((grand - totals[j]) % MOD + MOD) % MOD;
            }
            dp = move(nxt);
        }
        // each legal sequence lands in exactly one cell (final face, run len)
        long long answer = 0;
        for (int j = 0; j < 6; j++) {
            for (int c = 0; c < 16; c++)
                answer = (answer + dp[j][c]) % MOD;
        }
        return (int)answer;
    }
};

class Solution {
  public:
    int waysToDistribute(int n, int k) {
        // dp[i][j] counts distributions of the first i candies into exactly
        // j nonempty bags: candy i either joins one of the j bags the first
        // i - 1 candies already fill (j choices) or opens the j-th bag
        // itself, so dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1] — the
        // Stirling-number recurrence. Bags are unordered, so "open a new
        // bag" has no identity to choose and every distribution is built
        // exactly once. Each row depends only on the row above, so two
        // rows of k + 1 residues carry the whole table. Residues stay
        // below 2^30 and j at or below 1000, so j * prev[j] + prev[j - 1]
        // stays below 2^41 — safely inside the long long used here.
        constexpr long long MOD = 1'000'000'007;
        vector<long long> prev(k + 1, 0);
        prev[0] = 1;
        for (int i = 1; i <= n; ++i) {
            vector<long long> cur(k + 1, 0);
            int top = min(i, k);
            for (int j = 1; j <= top; ++j) {
                cur[j] = (j * prev[j] + prev[j - 1]) % MOD;
            }
            prev = move(cur);
        }
        return (int)prev[k];
    }
};

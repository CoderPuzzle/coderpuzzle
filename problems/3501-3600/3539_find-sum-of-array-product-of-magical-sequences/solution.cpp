class Solution {
  public:
    int magicalSum(int m, int k, vector<int> &nums) {
        // Forward DP over the indices of nums. State (j, b, mask) after a
        // prefix of indices: j sequence slots filled, b set bits of the sum
        // already finalized (every bit below the current index is fixed,
        // since later terms only add multiples of 2^i), and mask = partial
        // sum >> i, the carry window of not-yet-settled high bits (< 2^5).
        const long long MOD = 1000000007LL;
        int n = nums.size();
        // comb[a][c]: ways to scatter c copies of index i into the a = m - j
        // sequence slots still unassigned.
        vector<vector<long long>> comb(m + 1, vector<long long>(m + 1, 0));
        for (int a = 0; a <= m; ++a) {
            comb[a][0] = 1;
            for (int c = 1; c <= a; ++c)
                comb[a][c] = (comb[a - 1][c - 1] + comb[a - 1][c]) % MOD;
        }
        // pw[i][c] = nums[i]^c mod MOD (64-bit: the raw powers reach 1e16).
        vector<vector<long long>> pw(n, vector<long long>(m + 1, 1));
        for (int i = 0; i < n; ++i)
            for (int c = 1; c <= m; ++c)
                pw[i][c] = pw[i][c - 1] * nums[i] % MOD;
        auto dp = vector(m + 1, vector(m + 1, vector<long long>(32, 0)));
        dp[0][0][0] = 1;
        for (int i = 0; i < n; ++i) {
            auto ndp = vector(m + 1, vector(m + 1, vector<long long>(32, 0)));
            for (int j = 0; j <= m; ++j) {
                for (int b = 0; b <= m; ++b) {
                    for (int mask = 0; mask < 32; ++mask) {
                        long long v = dp[j][b][mask];
                        if (v == 0)
                            continue;
                        for (int c = 0; c <= m - j; ++c) {
                            int t = mask + c;
                            int nb = b + (t & 1);
                            // Set bits of a sum of j+c powers never exceed
                            // j+c: prune lanes that can no longer reach k.
                            if (nb + __builtin_popcount(t >> 1) > j + c)
                                continue;
                            long long add = v * comb[m - j][c] % MOD * pw[i][c] % MOD;
                            ndp[j + c][nb][t >> 1] = (ndp[j + c][nb][t >> 1] + add) % MOD;
                        }
                    }
                }
            }
            dp = move(ndp);
        }
        // After the last index, mask holds every remaining high bit: the
        // total set-bit count of the sum is b + popcount(mask).
        long long ans = 0;
        for (int b = 0; b <= m; ++b)
            for (int mask = 0; mask < 32; ++mask)
                if (b + __builtin_popcount(mask) == k)
                    ans = (ans + dp[m][b][mask]) % MOD;
        return (int)ans;
    }
};

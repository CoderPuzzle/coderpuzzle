class Solution {
  public:
    int countSubMultisets(vector<int> &nums, int l, int r) {
        // Group equal values: a sub-multiset takes each distinct value v
        // somewhere in 0..cnt[v] copies, so one pass per distinct value
        // applies the bounded-knapsack factor new[x] = sum(dp[x - k*v]
        // for k in 0..cnt[v]): a forward unbounded pass folds dp[x - v]
        // into dp[x], then subtracting dp[x - (cnt+1)*v] removes every
        // choice that used too many copies. Zeros change no sum and
        // multiply every count by cnt[0] + 1; the answer is the range
        // sum dp[l] + ... + dp[r].
        const long long MOD = 1000000007LL;
        unordered_map<int, long long> counts;
        for (int v : nums) {
            counts[v]++;
        }
        vector<long long> dp(r + 1, 0);
        dp[0] = 1;
        for (auto &[v, c] : counts) {
            if (v == 0) {
                for (int x = 0; x <= r; x++) {
                    dp[x] = dp[x] * (c + 1) % MOD;
                }
            } else if (v <= r) {
                for (int x = v; x <= r; x++) {
                    dp[x] = (dp[x] + dp[x - v]) % MOD;
                }
                long long width = (c + 1) * v;
                for (int x = r; x >= width; x--) {
                    dp[x] = (dp[x] - dp[x - width] + MOD) % MOD;
                }
            }
        }
        long long ans = 0;
        for (int x = l; x <= r; x++) {
            ans += dp[x];
        }
        return (int)(ans % MOD);
    }
};

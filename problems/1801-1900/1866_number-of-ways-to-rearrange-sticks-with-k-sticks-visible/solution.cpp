class Solution {
  public:
    int rearrangeSticks(int n, int k) {
        const long long MOD = 1000000007LL;
        // cur[j] = f(i, j): i sticks, j visible
        vector<long long> cur(k + 1, 0);
        cur[0] = 1; // f(0, 0)
        for (int i = 1; i <= n; i++) {
            vector<long long> nxt(k + 1, 0);
            for (int j = 1; j <= k; j++) {
                nxt[j] = (cur[j - 1] + (long long)(i - 1) * cur[j]) % MOD;
            }
            cur = move(nxt);
        }
        return (int)cur[k];
    }
};

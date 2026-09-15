class Solution {
  public:
    long long minTotalTime(vector<int> &forward, vector<int> &backward, vector<int> &queries) {
        // Prefix sums over both road sets. Forward distance a -> b walks
        // forward[a..], backward distance a -> b walks backward[a],
        // backward[a-1], ..., i.e. the descending edge weights. Each move
        // takes the cheaper of the two directions. Totals reach 1e5 moves x
        // 1e10 meters, far past 32 bits.
        int n = forward.size();
        vector<long long> F(n + 1, 0), B(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            F[i + 1] = F[i] + forward[i];
            B[i + 1] = B[i] + backward[i];
        }
        long long tf = F[n], tb = B[n];
        auto fwdDist = [&](int a, int b) -> long long { return a < b ? F[b] - F[a] : tf - F[a] + F[b]; };
        auto bwdDist = [&](int a, int b) -> long long {
            // spends backward[a], backward[a-1], ..., backward[b+1]
            return a > b ? B[a + 1] - B[b + 1] : B[a + 1] + tb - B[b + 1];
        };
        long long ans = 0;
        int prev = 0;
        for (int q : queries) {
            long long f = fwdDist(prev, q), b = bwdDist(prev, q);
            ans += f < b ? f : b;
            prev = q;
        }
        return ans;
    }
};

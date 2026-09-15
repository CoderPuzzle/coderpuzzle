#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    int maximumSaleItems(vector<vector<int>> &a, int B) {
        int M = 0;
        for (auto &x : a)
            M = max(M, x[0]);
        vector<int> f(M + 1), d(M + 1);
        for (auto &x : a)
            f[x[0]]++;
        for (int z = 1; z <= M; z++)
            for (int x = z; x <= M; x += z)
                d[z] += f[x];
        const int N = -1e9;
        vector<int> dp(B + 1, N);
        dp[0] = 0;
        for (auto &x : a) {
            int p = x[1], g = d[x[0]];
            auto old = dp, nw = dp;
            for (int r = 0; r < min(p, B + 1); r++) {
                int best = N, q = 0;
                for (int c = r; c <= B; c += p, q++) {
                    if (q && old[c - p] > N)
                        best = max(best, old[c - p] - q + 1);
                    if (best > N)
                        nw[c] = max(nw[c], q + g - 1 + best);
                }
            }
            dp.swap(nw);
        }
        return *max_element(dp.begin(), dp.end());
    }
};

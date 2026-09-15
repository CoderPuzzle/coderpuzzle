#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    int maxScore(vector<int> &a, int M) {
        int N = max(M, *max_element(a.begin(), a.end()));
        vector<int> f(N + 1), d(N + 1), sp(N + 1);
        iota(sp.begin(), sp.end(), 0);
        for (int x : a)
            f[x]++;
        for (int z = 1; z <= N; z++)
            for (int x = z; x <= N; x += z)
                d[z] += f[x];
        for (int p = 2; p * p <= N; p++)
            if (sp[p] == p)
                for (int x = p * p; x <= N; x += p)
                    if (sp[x] == x)
                        sp[x] = p;
        int ans = INT_MIN;
        for (int x = 1; x <= N; x++) {
            if (!f[x] && x > M)
                continue;
            vector<int> ps;
            for (int v = x; v > 1;) {
                int p = sp[v];
                ps.push_back(p);
                while (v % p == 0)
                    v /= p;
            }
            int bad = 0;
            for (int mask = 1; mask < (1 << ps.size()); mask++) {
                int z = 1, b = 0;
                for (int i = 0; i < ps.size(); i++)
                    if (mask >> i & 1)
                        z *= ps[i], b++;
                bad += (b & 1 ? 1 : -1) * d[z];
            }
            int cost = f[x] ? bad - (x > 1) : max(1, bad);
            ans = max(ans, x - cost);
        }
        return ans;
    }
};

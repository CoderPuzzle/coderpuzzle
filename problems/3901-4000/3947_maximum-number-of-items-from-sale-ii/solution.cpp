#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    long long maximumSaleItems(vector<vector<int>> &a, int B) {
        int n = a.size();
        vector<int> f(n + 1), d(n + 1);
        for (auto &x : a)
            f[x[0]]++;
        for (int z = 1; z <= n; z++)
            for (int x = z; x <= n; x += z)
                d[z] += f[x];
        vector<pair<int, int>> q;
        int cheap = INT_MAX;
        for (auto &x : a) {
            q.push_back({x[1], d[x[0]] - 1});
            cheap = min(cheap, x[1]);
        }
        sort(q.begin(), q.end());
        long long best = B / cheap, spent = 0, boost = 0;
        for (auto [p, cap] : q) {
            if (p > 2LL * cheap || !cap)
                continue;
            long long take = min<long long>(cap, (B - spent) / p);
            spent += take * p;
            boost += take;
            best = max(best, 2 * boost + (B - spent) / cheap);
            if (take < cap)
                break;
        }
        return best;
    }
};

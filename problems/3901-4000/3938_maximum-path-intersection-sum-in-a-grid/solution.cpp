#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    int maxScore(vector<vector<int>> &g) {
        int ans = INT_MIN;
        auto scan = [&](vector<int> a) {
            int e = a[0];
            for (int i = 1; i < a.size(); i++) {
                int z = e + a[i];
                ans = max(ans, z);
                e = max(a[i], z);
            }
        };
        for (auto &r : g)
            scan(r);
        for (int j = 0; j < g[0].size(); j++) {
            vector<int> a;
            for (auto &r : g)
                a.push_back(r[j]);
            scan(a);
        }
        for (int i = 1; i + 1 < g.size(); i++)
            for (int j = 1; j + 1 < g[0].size(); j++)
                ans = max(ans, g[i][j]);
        return ans;
    }
};

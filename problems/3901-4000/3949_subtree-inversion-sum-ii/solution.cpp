#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    long long subtreeInversionSum(vector<vector<int>> &e, vector<int> &nums, int k) {
        int n = nums.size(), w = k + 1;
        vector<vector<int>> g(n);
        for (auto &x : e)
            g[x[0]].push_back(x[1]), g[x[1]].push_back(x[0]);
        vector<int> p(n, -1), ord{0};
        for (int z = 0; z < ord.size(); z++) {
            int u = ord[z];
            for (int v : g[u])
                if (v != p[u])
                    p[v] = u, ord.push_back(v);
        }
        const long long I = 4e18, N = -I;
        vector<long long> mx((long long)n * w, N), mn((long long)n * w, I);
        for (int z = n - 1; z >= 0; z--) {
            int u = ord[z];
            vector<long long> a(w, N), b(w, I);
            a[k] = b[k] = nums[u];
            long long sm = -nums[u], sn = -nums[u];
            for (int v : g[u])
                if (p[v] == u) {
                    long long *X = &mx[(long long)v * w], *Y = &mn[(long long)v * w];
                    sm -= min(Y[k - 1], Y[k]);
                    sn -= max(X[k - 1], X[k]);
                    vector<long long> x(w, N), y(w, I);
                    for (int d = 0; d < k; d++)
                        x[d + 1] = X[d], y[d + 1] = Y[d];
                    x[k] = max(x[k], X[k]);
                    y[k] = min(y[k], Y[k]);
                    auto ax = a, ay = b, xx = x, xy = y;
                    for (int d = k - 1; d >= 0; d--)
                        ax[d] = max(ax[d], ax[d + 1]), ay[d] = min(ay[d], ay[d + 1]), xx[d] = max(xx[d], xx[d + 1]),
                        xy[d] = min(xy[d], xy[d + 1]);
                    vector<long long> na(w, N), nb(w, I);
                    na[k] = a[k] + x[k];
                    nb[k] = b[k] + y[k];
                    for (int d = 1; d < k; d++) {
                        int t = max(d, k - d);
                        na[d] = max(a[d] + xx[t], x[d] + ax[t]);
                        nb[d] = min(b[d] + xy[t], y[d] + ay[t]);
                    }
                    a.swap(na);
                    b.swap(nb);
                }
            a[0] = sm;
            b[0] = sn;
            copy(a.begin(), a.end(), mx.begin() + (long long)u * w);
            copy(b.begin(), b.end(), mn.begin() + (long long)u * w);
        }
        return *max_element(mx.begin(), mx.begin() + w);
    }
};

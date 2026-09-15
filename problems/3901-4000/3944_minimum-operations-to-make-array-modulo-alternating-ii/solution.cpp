#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    long long minOperations(vector<int> &a, int k) {
        auto costs = [&](int p) {
            vector<long long> c(k), t(3 * k), pc(3 * k + 1), ps(3 * k + 1), o(k);
            for (int i = p; i < a.size(); i += 2)
                c[a[i] % k]++;
            for (int i = 0; i < 3 * k; i++) {
                t[i] = c[i % k];
                pc[i + 1] = pc[i] + t[i];
                ps[i + 1] = ps[i] + t[i] * i;
            }
            int h = k / 2;
            for (int x = 0; x < k; x++) {
                int m = x + k, l = m - h, r = m + k - 1 - h;
                long long lc = pc[m + 1] - pc[l], ls = ps[m + 1] - ps[l], rc = pc[r + 1] - pc[m + 1],
                          rs = ps[r + 1] - ps[m + 1];
                o[x] = m * lc - ls + rs - m * rc;
            }
            return o;
        };
        auto e = costs(0), o = costs(1);
        int p = 0, q = 1;
        if (o[q] < o[p])
            swap(p, q);
        for (int i = 2; i < k; i++)
            if (o[i] < o[p]) {
                q = p;
                p = i;
            } else if (o[i] < o[q])
                q = i;
        long long ans = LLONG_MAX;
        for (int x = 0; x < k; x++)
            ans = min(ans, e[x] + o[p == x ? q : p]);
        return ans;
    }
};

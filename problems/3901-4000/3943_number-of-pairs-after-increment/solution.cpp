#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    vector<int> numberOfPairs(vector<int> &a, vector<int> &b, vector<vector<int>> &qs) {
        int S = 225, B = (b.size() + S - 1) / S;
        vector<long long> v(b.begin(), b.end()), lazy(B);
        vector<unordered_map<long long, int>> f(B);
        auto rebuild = [&](int z) {
            int l = z * S, r = min((int)v.size(), l + S);
            if (lazy[z]) {
                for (int i = l; i < r; i++)
                    v[i] += lazy[z];
                lazy[z] = 0;
            }
            f[z].clear();
            for (int i = l; i < r; i++)
                f[z][v[i]]++;
        };
        for (int z = 0; z < B; z++)
            rebuild(z);
        unordered_map<int, int> af;
        for (int x : a)
            af[x]++;
        vector<int> out;
        for (auto &q : qs)
            if (q[0] == 1) {
                int l = q[1], r = q[2], x = q[3], L = l / S, R = r / S;
                if (L == R) {
                    rebuild(L);
                    for (int i = l; i <= r; i++)
                        v[i] += x;
                    rebuild(L);
                } else {
                    rebuild(L);
                    for (int i = l; i < (L + 1) * S; i++)
                        v[i] += x;
                    rebuild(L);
                    rebuild(R);
                    for (int i = R * S; i <= r; i++)
                        v[i] += x;
                    rebuild(R);
                    for (int z = L + 1; z < R; z++)
                        lazy[z] += x;
                }
            } else {
                int z = 0;
                for (auto [x, c] : af)
                    for (int j = 0; j < B; j++) {
                        auto it = f[j].find((long long)q[1] - x - lazy[j]);
                        if (it != f[j].end())
                            z += c * it->second;
                    }
                out.push_back(z);
            }
        return out;
    }
};

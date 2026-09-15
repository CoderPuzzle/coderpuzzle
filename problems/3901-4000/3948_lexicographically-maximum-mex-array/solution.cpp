#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    vector<int> maximumMEX(vector<int> &a) {
        int n = a.size();
        vector<int> f(n + 1);
        for (int x : a)
            if (x <= n)
                f[x]++;
        int mex = 0;
        while (f[mex])
            mex++;
        vector<int> out;
        for (int i = 0; i < n;) {
            out.push_back(mex);
            if (!mex) {
                if (a[i] <= n)
                    f[a[i]]--;
                i++;
                continue;
            }
            vector<char> seen(mex);
            int miss = mex, next = mex;
            while (miss) {
                int x = a[i++];
                if (x <= n && !--f[x] && x < next)
                    next = x;
                if (x < mex && !seen[x])
                    seen[x] = 1, miss--;
            }
            mex = next;
        }
        return out;
    }
};

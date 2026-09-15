#include <bits/stdc++.h>
using namespace std;
class Solution {
  public:
    long long maxTotal(vector<int> &a, string s) {
        long long ans = 0;
        for (int i = 0; i < a.size();) {
            if (s[i] == '0') {
                i++;
                continue;
            }
            int l = i, m = INT_MAX;
            long long z = 0;
            while (i < a.size() && s[i] == '1')
                z += a[i], m = min(m, a[i++]);
            ans += l ? z + a[l - 1] - min(m, a[l - 1]) : z;
        }
        return ans;
    }
};

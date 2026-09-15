#include <algorithm>
#include <string>
#include <vector>

using namespace std;

class Solution {
  public:
    bool canMakeSubsequence(string s, string t) {
        int m = (int)s.size(), n = (int)t.size();
        vector<int> pref(m + 1, n + 1);
        pref[0] = 0;
        for (int i = 0; i < m; ++i) {
            int j = pref[i];
            while (j < n && s[i] != t[j])
                ++j;
            pref[i + 1] = j < n ? j + 1 : n + 1;
        }
        if (pref[m] <= n)
            return true;

        vector<int> suf(m + 1, -1);
        suf[m] = n;
        for (int i = m - 1; i >= 0; --i) {
            int j = suf[i + 1] - 1;
            while (j >= 0 && s[i] != t[j])
                --j;
            suf[i] = j;
        }

        for (int i = 0; i < m; ++i)
            if (pref[i] < suf[i + 1])
                return true;
        return false;
    }
};

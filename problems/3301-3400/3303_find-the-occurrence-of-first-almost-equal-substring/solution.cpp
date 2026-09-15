#include <string>
#include <vector>

class Solution {
  public:
    int minStartingIndex(string s, string pattern) {
        // A window s[i..i+m-1] is almost equal to pattern iff its mismatches
        // fit in one slot: with f = forward match length at i (prefix of
        // pattern) and b = backward match length from the window's right end
        // (suffix of pattern), the window matches exactly when f == m, and
        // when f + b >= m - 1 the runs leave at most one character between
        // them, which a single change absorbs. Both tables come from
        // Z-functions: forward over pattern + sep + s; over the reversals, a
        // prefix of the reversed pattern matching at offset n - 1 - (window
        // end) is exactly a common suffix ending at that window end.
        int n = (int)s.size(), m = (int)pattern.size();
        vector<int> values;
        values.reserve(m + 1 + n);
        for (char ch : pattern)
            values.push_back((unsigned char)ch);
        values.push_back(-1);
        for (char ch : s)
            values.push_back((unsigned char)ch);
        vector<int> z = zFunction(values);
        vector<int> rvalues;
        rvalues.reserve(m + 1 + n);
        for (int i = m - 1; i >= 0; --i)
            rvalues.push_back((unsigned char)pattern[i]);
        rvalues.push_back(-1);
        for (int i = n - 1; i >= 0; --i)
            rvalues.push_back((unsigned char)s[i]);
        vector<int> r = zFunction(rvalues);
        for (int i = 0; i + m <= n; ++i) {
            int f = min(z[m + 1 + i], m);
            if (f >= m || f + min(r[m + 1 + n - i - m], m) >= m - 1)
                return i;
        }
        return -1;
    }

  private:
    static vector<int> zFunction(const vector<int> &values) {
        int m = (int)values.size();
        vector<int> z(m, 0);
        z[0] = m;
        int left = 0, right = 0;
        for (int i = 1; i < m; i++) {
            if (i < right) {
                z[i] = min(right - i, z[i - left]);
            }
            while (i + z[i] < m && values[z[i]] == values[i + z[i]]) {
                z[i]++;
            }
            if (i + z[i] > right) {
                left = i;
                right = i + z[i];
            }
        }
        return z;
    }
};

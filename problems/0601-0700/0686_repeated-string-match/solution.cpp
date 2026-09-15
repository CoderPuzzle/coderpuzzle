#include <string>

class Solution {
  public:
    int repeatedStringMatch(string a, string b) {
        int n = a.size(), m = b.size();
        // q = ceil(m/n) is the least count whose text is even as long as b,
        // and no occurrence needs more than q + 1: a repeated forever has
        // period n, so any occurrence of b slides into the first q + 1 copies.
        int q = (m + n - 1) / n;
        string repeated;
        for (int i = 0; i < q; ++i)
            repeated += a;
        if (repeated.find(b) != string::npos)
            return q;
        repeated += a;
        if (repeated.find(b) != string::npos)
            return q + 1;
        return -1;
    }
};

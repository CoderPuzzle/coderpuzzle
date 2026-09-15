#include <algorithm>
#include <vector>

class Solution {
  public:
    int findMaxVal(int n, vector<vector<int>> &restrictions, vector<int> &diff) {
        const long long INF = LLONG_MAX;

        // Upper bound per position from left-propagated caps and
        // restrictions. Position 0 carries the sequence's own anchor:
        // a[0] = 0, so no value can exceed what diff allows away from it.
        vector<long long> cap(n, INF);
        cap[0] = 0;
        sort(restrictions.begin(), restrictions.end());
        for (const auto &restriction : restrictions) {
            if (restriction[1] < cap[restriction[0]]) {
                cap[restriction[0]] = restriction[1];
            }
        }
        for (int i = 1; i < n; i++) {
            if (cap[i - 1] + diff[i - 1] < cap[i]) {
                cap[i] = cap[i - 1] + diff[i - 1];
            }
        }

        // Right pass mirrors it: a tight bound at j also caps every
        // position i < j to cap[j] + sum(diff[i..j-1]).
        for (int i = n - 2; i >= 0; i--) {
            if (cap[i + 1] + diff[i] < cap[i]) {
                cap[i] = cap[i + 1] + diff[i];
            }
        }

        // The optimal sequence attains every bound simultaneously, so the
        // largest value in it is the largest bound.
        long long answer = 0;
        for (int i = 0; i < n; i++) {
            answer = max(answer, cap[i]);
        }
        return static_cast<int>(answer);
    }
};

class Solution {
  public:
    int minOperations(string s1, string s2, int x) {
        // Only mismatched positions need a net flip, and both operations flip
        // exactly two positions, so an odd mismatch count is impossible.
        vector<int> diffs;
        for (int i = 0; i < (int)s1.size(); ++i) {
            if (s1[i] != s2[i])
                diffs.push_back(i);
        }
        int m = (int)diffs.size();
        if (m % 2 == 1)
            return -1;
        const long long INF = 1LL << 40;
        // pending[i][c]: mismatches before i are resolved, mismatch i is not,
        // and c = 1 when an already-paid x-op covers one future mismatch for
        // free. The credit may stay open across other pairs — nesting an
        // x-pair around an adjacent chain is exactly what beats pairing
        // consecutive mismatches when x is small.
        vector<array<long long, 2>> pending(m + 1, {INF, INF});
        pending[0][0] = 0;
        for (int i = 0; i < m; ++i) {
            long long free = pending[i][0], credited = pending[i][1];
            // Close a credit: mismatch i flips free with the earlier partner.
            pending[i + 1][0] = min(pending[i + 1][0], credited);
            // Open a credit: pay x, mismatch i pairs with a later mismatch.
            pending[i + 1][1] = min(pending[i + 1][1], free + x);
            if (i + 2 <= m) {
                long long pair = min((long long)x, (long long)(diffs[i + 1] - diffs[i]));
                pending[i + 2][0] = min(pending[i + 2][0], free + pair);
                pending[i + 2][1] = min(pending[i + 2][1], credited + pair);
            }
        }
        return (int)pending[m][0];
    }
};

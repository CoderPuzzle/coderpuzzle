class Solution {
  public:
    // n can be 10^9, so nothing may touch cells directly. Sorting by
    // start and sweeping a cursor turns every stretch the cursor skips
    // over into one maximal uncovered range: a gap is emitted whenever
    // the next sorted range begins beyond the cursor, and the cursor
    // then jumps past that range's end (overlaps merge implicitly).
    vector<vector<int>> findMaximalUncoveredRanges(int n, vector<vector<int>> &ranges) {
        vector<vector<int>> rs = ranges;
        sort(rs.begin(), rs.end());
        vector<vector<int>> res;
        long long cur = 0; // e + 1 reaches n = up to 10^9, still int-safe,
                           // kept wide so the comparison never narrows
        for (auto &r : rs) {
            long long s = r[0];
            long long e = r[1];
            if (s > cur) {
                // Cells [cur, s - 1] meet no covering range.
                res.push_back({(int)cur, (int)(s - 1)});
            }
            if (e + 1 > cur)
                cur = e + 1;
        }
        if (cur < n)
            res.push_back({(int)cur, n - 1});
        return res;
    }
};

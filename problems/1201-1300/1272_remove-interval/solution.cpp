class Solution {
  public:
    vector<vector<int>> removeInterval(vector<vector<int>> &intervals, vector<int> &toBeRemoved) {
        // Per interval, three outcomes: disjoint from the removal (keep
        // whole), straddling the left edge (keep head), or straddling the
        // right edge (keep tail); a full cover keeps nothing. An interval
        // can only ever be cut into two pieces, never more.
        vector<vector<int>> kept;
        int removeStart = toBeRemoved[0];
        int removeEnd = toBeRemoved[1];
        for (const auto &interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            if (start >= removeEnd || end <= removeStart) {
                kept.push_back(interval);
                continue;
            }
            if (start < removeStart) {
                kept.push_back({start, removeStart});
            }
            if (end > removeEnd) {
                kept.push_back({removeEnd, end});
            }
        }
        return kept;
    }
};

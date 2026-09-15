class Solution {
  public:
    vector<vector<int>> insert(vector<vector<int>> &intervals, vector<int> &newInterval) {
        vector<vector<int>> merged;
        merged.reserve(intervals.size() + 1);
        int n = intervals.size();
        // The new interval is widened in start/end locals so the caller's
        // newInterval is never mutated while it is being absorbed.
        int start = newInterval[0];
        int end = newInterval[1];
        int i = 0;
        // Phase 1 — an interval ending strictly before the new one starts
        // shares no point with it, so every such interval passes through
        // untouched and in order.
        while (i < n && intervals[i][1] < start) {
            merged.push_back(intervals[i]);
            ++i;
        }
        // Phase 2 — an interval starting at or before the new end shares at
        // least one point, so it is absorbed by widening [start, end] to
        // cover it. The absorbed intervals are contiguous because the input
        // is sorted by start, so one widening run merges everything.
        while (i < n && intervals[i][0] <= end) {
            start = min(start, intervals[i][0]);
            end = max(end, intervals[i][1]);
            ++i;
        }
        merged.push_back({start, end});
        // Phase 3 — whatever is left starts strictly after the new end, so
        // it shares no point with the merged interval either and passes
        // through untouched.
        while (i < n) {
            merged.push_back(intervals[i]);
            ++i;
        }
        return merged;
    }
};

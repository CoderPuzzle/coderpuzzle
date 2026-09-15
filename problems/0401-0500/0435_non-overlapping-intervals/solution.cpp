class Solution {
  public:
    int eraseOverlapIntervals(vector<vector<int>> &intervals) {
        sort(intervals.begin(), intervals.end(),
             [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        // Minimizing removals = maximizing kept non-overlapping intervals, so
        // sweep by earliest end: keeping the earliest-ending candidate leaves
        // the most room for everything after it.
        int removed = 0;
        // Sentinel below any real endpoint (endpoints may be negative).
        long long prevEnd = LLONG_MIN;
        for (const auto &interval : intervals) {
            // Touching endpoints do not overlap, so start == prevEnd keeps.
            if (interval[0] >= prevEnd) {
                prevEnd = interval[1];
            } else {
                // Discarded: it intersects the last kept (earliest-ending)
                // interval, so one removal per conflict is exactly optimal.
                removed++;
            }
        }
        return removed;
    }
};

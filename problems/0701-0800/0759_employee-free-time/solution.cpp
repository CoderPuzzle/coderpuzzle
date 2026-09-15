class Solution {
  public:
    vector<vector<int>> employeeFreeTime(vector<vector<vector<int>>> &schedule) {
        // A moment is free exactly when no employee is busy, so only the
        // union matters: pool every interval, forgetting ownership.
        vector<pair<int, int>> intervals;
        for (const auto &employee : schedule) {
            for (const auto &interval : employee) {
                intervals.emplace_back(interval[0], interval[1]);
            }
        }
        // Sorted by start (then end), the sweep meets busy blocks in order.
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> free;
        bool started = false;
        int previousEnd = 0;
        for (const auto &[start, end] : intervals) {
            // Starting strictly beyond the furthest end seen so far proves
            // nothing covers (previousEnd, start); strictness keeps
            // touching intervals continuous (no zero-length gaps).
            if (started && start > previousEnd) {
                free.push_back({previousEnd, start});
            }
            // Otherwise merge into the busy block, keeping the running max
            // of ends so a long interval absorbs shorter ones inside it.
            previousEnd = !started ? end : max(previousEnd, end);
            started = true;
        }
        return free;
    }
};

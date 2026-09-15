class Solution {
  public:
    vector<vector<int>> merge(vector<vector<int>> &intervals) {
        // Copy, then sort by start (end as tiebreaker): any interval
        // overlapping an earlier one must overlap or touch the most recent
        // merged interval, so a sweep tracking only the last merged
        // interval suffices. Sorting the copy leaves the input untouched.
        vector<vector<int>> ordered(intervals);
        sort(ordered.begin(), ordered.end());
        vector<vector<int>> merged;
        for (auto &interval : ordered) {
            int start = interval[0];
            int end = interval[1];
            // `<=` counts touching intervals as overlapping, as required.
            // The start is already covered, so only the right edge matters.
            if (!merged.empty() && start <= merged.back()[1]) {
                // Raise the right edge when larger; an interval fully
                // swallowed by the merge leaves it untouched.
                if (end > merged.back()[1]) {
                    merged.back()[1] = end;
                }
            } else {
                // No overlap with the last merged interval: new group.
                merged.push_back({start, end});
            }
        }
        return merged;
    }
};

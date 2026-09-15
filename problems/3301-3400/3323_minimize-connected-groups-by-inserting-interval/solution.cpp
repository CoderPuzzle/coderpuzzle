class Solution {
  public:
    int minConnectedGroups(vector<vector<int>> &intervals, int k) {
        // Only the merged components matter: sort the intervals, merge the
        // overlapping ones, and the answer is the component count minus the
        // largest number of consecutive components one new interval can
        // straddle. A new interval of length at most k joins components l
        // through r exactly when their end-to-end span, c_r.start -
        // c_l.end, is at most k (the interval must reach across every
        // component in between, not just the empty gaps). Both endpoint
        // bounds move monotonically, so two pointers find the widest valid
        // window: advance the right end and shrink from the left while the
        // span exceeds k. All coordinates fit in int, so every span does
        // too (the span is at most 10^9).
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.reserve(intervals.size());
        for (const vector<int> &interval : intervals) {
            if (!merged.empty() && interval[0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            } else {
                merged.push_back(interval);
            }
        }
        int best = 0;
        int left = 0;
        for (int right = 0; right < (int)merged.size(); ++right) {
            while (merged[right][0] - merged[left][1] > k) {
                ++left;
            }
            best = max(best, right - left);
        }
        return (int)merged.size() - best;
    }
};

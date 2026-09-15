class Solution {
  public:
    bool canAttendMeetings(vector<vector<int>> &intervals) {
        // Overlap, if any, must sit between next-door meetings once the
        // order is by start time, so sorting makes one linear pass enough.
        sort(intervals.begin(), intervals.end());
        // A meeting ending exactly when the next begins is fine: the clash
        // test is strictly previous end > next start.
        for (int i = 1; i < (int)intervals.size(); ++i) {
            if (intervals[i - 1][1] > intervals[i][0])
                return false;
        }
        return true;
    }
};

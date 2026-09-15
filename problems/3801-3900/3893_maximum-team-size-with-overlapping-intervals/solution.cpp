#include <algorithm>
#include <vector>

class Solution {
  public:
    int maximumTeamSize(vector<int> &startTime, vector<int> &endTime) {
        // A team is valid when one member overlaps everyone else, so the
        // largest team is the largest set of intervals all overlapping a single
        // interval. For each interval i that is exactly the intervals j with
        // startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
        int n = (int)startTime.size();
        vector<int> starts = startTime;
        vector<int> ends = endTime;
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        int best = 0;
        for (int i = 0; i < n; i++) {
            // Count starts no later than end minus ends earlier than start; the
            // second set is a subset of the first, so the difference is exactly
            // the overlapping intervals, including i itself.
            int startsLe = (int)(upper_bound(starts.begin(), starts.end(), endTime[i]) - starts.begin());
            int endsLt = (int)(lower_bound(ends.begin(), ends.end(), startTime[i]) - ends.begin());
            int overlap = startsLe - endsLt;
            if (overlap > best) {
                best = overlap;
            }
        }
        return best;
    }
};

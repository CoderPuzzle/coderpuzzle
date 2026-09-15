#include <algorithm>
#include <vector>

class Solution {
  public:
    int removeCoveredIntervals(std::vector<std::vector<int>> &intervals) {
        // Sort by start ascending, end DESCENDING: then any interval whose
        // end is not beyond the best end seen so far must sit inside some
        // earlier interval (equal starts sort the wider one first, so the
        // narrower twin is correctly counted as covered).
        std::sort(intervals.begin(), intervals.end(), [](const std::vector<int> &a, const std::vector<int> &b) {
            if (a[0] != b[0]) {
                return a[0] < b[0];
            }
            return b[1] < a[1];
        });
        int remaining = 0;
        int bestEnd = 0;
        for (const auto &interval : intervals) {
            if (interval[1] > bestEnd) {
                remaining++;
                bestEnd = interval[1];
            }
        }
        return remaining;
    }
};

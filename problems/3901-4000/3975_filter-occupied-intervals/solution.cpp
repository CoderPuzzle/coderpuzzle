#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<vector<int>> filterOccupiedIntervals(vector<vector<int>> &occupiedIntervals, int freeStart, int freeEnd) {
        sort(occupiedIntervals.begin(), occupiedIntervals.end());
        vector<vector<int>> merged;
        for (auto &interval : occupiedIntervals) {
            if (!merged.empty() && interval[0] <= merged.back()[1] + 1)
                merged.back()[1] = max(merged.back()[1], interval[1]);
            else
                merged.push_back({interval[0], interval[1]});
        }

        vector<vector<int>> answer;
        for (auto &interval : merged) {
            int start = interval[0], end = interval[1];
            if (freeEnd < start || freeStart > end) {
                answer.push_back({start, end});
                continue;
            }
            if (freeStart > start)
                answer.push_back({start, freeStart - 1});
            if (freeEnd < end)
                answer.push_back({freeEnd + 1, end});
        }
        return answer;
    }
};

#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    long long minEnergy(int n, int brightness, vector<vector<int>> &intervals) {
        long long bulbs = ((long long)brightness + 2) / 3;
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        for (auto &interval : intervals) {
            if (!merged.empty() && interval[0] <= merged.back()[1] + 1)
                merged.back()[1] = max(merged.back()[1], interval[1]);
            else
                merged.push_back({interval[0], interval[1]});
        }
        long long activeTime = 0;
        for (auto &interval : merged)
            activeTime += (long long)interval[1] - interval[0] + 1;
        return bulbs * activeTime;
    }
};
